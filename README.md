# worldReputation
A Steam-like platform for traditional and Web3 games.

Active Site: https://worldrep.xyz/

# Overview
worldRep is a platform that allows users to import their Steam and web3 gaming accounts into one universal profile to be stored on-chain. Users can also discover new games on the platform and deploy their own across different ecosystems.

## Profiles
Users will be able to display their selected games and stats for both Steam and web3 games. For blockchain games, achievements in the form of NFTs will also be displayed based on user preferences. 

## Play
Players can use worldRep as their all-in-one launcher. This launcher approach is especially important for web3 gaming, where games are more significantly divided by chain. worldRep removes the friction from playing on-chain games by handling wallet setup if necessary and tracking in-game stats.

## Discover
Users can discover new traditional and web3 indexed on worldRep. Games will get indexed to the site's discovery page in the case that a player connects an account with games in their library that are not already referenced on worldRep. Developers can also preemptively index their games as a part of the Create + Launch feature.

## Create
worldRep will make it easier for anyone to create their own games, starting with web3. worldRep will provide templated game contracts and the project tools necessary to create and deploy new games across different chains. Games created on the platform will be automatically indexed. worldRep can provide additional tools for monetization as well.

## Technical Implementation
### Repository Structure
The frontend directory includes the React + TypeScript frontend with Steam and Starknet integrations.

### Smart Contracts
- Cairo (Starknet)
- Move (Aptos)

### Integrations
worldRep allows sign-up through SSO (Google, Discord, etc.) or with a web3 wallet. The Steam API powers the Steam account connection and allows users to display their libraries, hours played, etc.
