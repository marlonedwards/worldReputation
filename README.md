# worldReputation
A Steam-like platform for traditional and Web3 games.

# Overview
worldRep is a platform that allows users to import their Steam and web3 gaming accounts into one profile to be stored on-chain. The initial goal is to support Starknet games and then expand to other chains.

## User Profiles
Users will be able to display their selected games and stats for both Steam and web3 games. For blockchain games, achievements in the form of NFTs will also be displayed based on user preferences. 

## Tech Stack
- Cairo for smart contracts
- React and TypeScript for the dashboard
- PostgreSQL

### Integrations
worldRep allows sign-up through SSO (Google, Discord, etc.) or with a wallet. The Steam API powers the Steam account connection and allows users to display their libraries, hours played, etc.
