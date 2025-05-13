use starknet::ContractAddress;

// Simplified ProfileData struct with just Steam username and connection status
#[derive(Copy, Drop, Serde, starknet::Store)]
pub struct ProfileData {
    // Core profile information
    pub owner: ContractAddress,
    pub steam_username: felt252,
    pub is_connected: bool, // Whether the Steam account is connected
}

// Event emitted when a profile is updated
#[derive(Drop, starknet::Event)]
pub struct ProfileUpdated {
    pub owner: ContractAddress,
    pub timestamp: u64,
}

// Simple interface for the profile contract
#[starknet::interface]
pub trait IProfileContract<TContractState> {
    fn get_profile(self: @TContractState, address: ContractAddress) -> ProfileData;
    fn update_profile(ref self: TContractState, steam_username: felt252, is_connected: bool);
    fn is_profile_registered(self: @TContractState, address: ContractAddress) -> bool;
}