#[starknet::contract]
mod ProfileContract {
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess, Map};
    use worldrep::interfaces::{ProfileData, ProfileUpdated, IProfileContract};

    // Events
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        ProfileUpdated: ProfileUpdated,
    }

    // Storage
    #[storage]
    struct Storage {
        profiles: Map<ContractAddress, ProfileData>,
        profile_exists: Map<ContractAddress, bool>,
        owner: ContractAddress,
    }

    // Constructor
    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.owner.write(owner);
    }

    // Implementation of the interface
    #[abi(embed_v0)]
    impl ProfileContractImpl of IProfileContract<ContractState> {
        fn get_profile(self: @ContractState, address: ContractAddress) -> ProfileData {
            // Check if profile exists
            let exists = self.profile_exists.read(address);
            assert(exists, 'Profile does not exist');
            
            // Return the profile data
            self.profiles.read(address)
        }

        fn update_profile(ref self: ContractState, steam_username: felt252, is_connected: bool) {
            // Get the caller address (profile owner)
            let owner = get_caller_address();
            
            // Create or update profile data
            let profile_data = ProfileData {
                owner: owner,
                steam_username: steam_username,
                is_connected: is_connected,
            };
            
            // Store the profile data
            self.profiles.write(owner, profile_data);
            
            // Mark that this profile exists
            self.profile_exists.write(owner, true);
            
            // Emit profile updated event
            self.emit(ProfileUpdated {
                owner: owner,
                timestamp: get_block_timestamp()
            });
        }

        fn is_profile_registered(self: @ContractState, address: ContractAddress) -> bool {
            self.profile_exists.read(address)
        }
    }

    // Owner-only function
    #[generate_trait]
    impl OwnerFunctions of OwnerFunctionsTrait {
        fn assert_only_owner(self: @ContractState) {
            let caller = get_caller_address();
            let owner = self.owner.read();
            assert(caller == owner, 'Caller is not the owner');
        }
    }
}