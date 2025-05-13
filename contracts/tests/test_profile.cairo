use starknet::ContractAddress;
use starknet::testing::{set_caller_address, set_contract_address};
use worldrep::interfaces::ProfileData;
use worldrep::profile::ProfileContract;

#[test]
fn test_profile_registration() {
    // Setup
    let owner = starknet::contract_address_const::<0x123>();
    let mut state = ProfileContract::contract_state_for_testing();
    ProfileContract::constructor(ref state, owner);
    
    // Set caller address for testing
    set_caller_address(owner);
    
    // Test profile update
    let steam_username = 'gamer123';
    let is_connected = true;
    ProfileContract::update_profile(ref state, steam_username, is_connected);
    
    // Test profile retrieval
    let profile = ProfileContract::get_profile(@state, owner);
    assert(profile.owner == owner, 'Owner mismatch');
    assert(profile.steam_username == steam_username, 'Username mismatch');
    assert(profile.is_connected == is_connected, 'Connection status mismatch');
    
    // Test registration check
    let is_registered = ProfileContract::is_profile_registered(@state, owner);
    assert(is_registered, 'Profile should be registered');
}