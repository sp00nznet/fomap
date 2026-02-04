// Fallout 2 Location Database - New California 2241
// Coordinates calibrated to actual game map image

const CATEGORIES = {
    towns: { name: 'Major Towns', color: '#ffb000' },
    vaults: { name: 'Vaults', color: '#ff6600' },
    tribal: { name: 'Tribal Lands', color: '#66ff66' },
    military: { name: 'Military', color: '#ff3333' },
    faction: { name: 'Faction HQ', color: '#9966ff' },
    industrial: { name: 'Industrial', color: '#996633' },
    caves: { name: 'Caves & Mines', color: '#666666' },
    special: { name: 'Special', color: '#00ffff' }
};

// Coordinates calibrated to map.jpg
// Map shows California with coast on LEFT side
// Green markers indicate major locations
// Navarro is on the LEFT COAST in lower portion
const locations = [
    // === TRIBAL & STARTING AREA (Northwest) ===
    { id: 1, name: 'Arroyo', category: 'tribal', x: 0.08, y: 0.05,
      description: 'Your home village, founded by the Vault Dweller after the events of Fallout 1. The tribe is dying and you must find the G.E.C.K. to save them.' },
    { id: 61, name: 'Temple of Trials', category: 'tribal', x: 0.07, y: 0.04,
      description: 'The tribal initiation test you must pass to begin your journey. Tests combat and lockpicking skills.' },

    // === NORTHERN TOWNS ===
    { id: 2, name: 'Klamath', category: 'towns', x: 0.18, y: 0.10,
      description: 'A small trapping community known for gecko hunting. Home to the Dunton brothers and Sulik, a potential companion. The Toxic Caves lie nearby.' },
    { id: 60, name: 'Toxic Caves', category: 'caves', x: 0.15, y: 0.12,
      description: 'Radiation-filled caves near Klamath. Contains geckos and the remains of a trapper. Smiley the trapper may need rescue.' },
    { id: 3, name: 'The Den', category: 'towns', x: 0.22, y: 0.18,
      description: 'A lawless town of slavers, drug dealers, and criminals. Home to Metzger\'s slaver operation and several useful services. Beware of pickpockets.' },

    // === CENTRAL-NORTH REGION ===
    { id: 4, name: 'Modoc', category: 'towns', x: 0.48, y: 0.12,
      description: 'A farming community with a dark secret at the Ghost Farm. Known for their brahmin and the mysterious Slags living underground.' },
    { id: 62, name: 'Ghost Farm', category: 'special', x: 0.50, y: 0.10,
      description: 'Mysterious farm near Modoc. Appears haunted but actually home to the Slags - underground dwellers who farm at night.' },
    { id: 6, name: 'Gecko', category: 'towns', x: 0.58, y: 0.15,
      description: 'A ghoul settlement built around a damaged nuclear power plant. Harold the ghoul lives here. The reactor needs repair to stop poisoning Vault City\'s water.' },
    { id: 50, name: 'Gecko Power Plant', category: 'industrial', x: 0.60, y: 0.14,
      description: 'A pre-war nuclear reactor maintained by ghouls. Leaking radiation threatens Vault City. Fixing it requires technical expertise.' },
    { id: 5, name: 'Vault City', category: 'towns', x: 0.68, y: 0.18,
      description: 'A highly advanced settlement built by Vault 8 dwellers. Xenophobic and bureaucratic, they use "servants" (slaves in all but name). First Citizen Lynette rules with an iron fist.' },
    { id: 20, name: 'Vault 8', category: 'vaults', x: 0.70, y: 0.17,
      description: 'The vault that founded Vault City. A control vault that worked exactly as intended. Contains the G.E.C.K. used to build the settlement.' },

    // === FAR EAST ===
    { id: 64, name: 'Abbey', category: 'special', x: 0.90, y: 0.12,
      description: 'A monastery preserving pre-war knowledge. Cut content restored in fan patches. Monks maintain a vast library.' },
    { id: 32, name: 'Sierra Army Depot', category: 'military', x: 0.88, y: 0.22,
      description: 'Pre-war military storage facility. Home to Skynet, an AI that can become a companion. Contains rare weapons and power armor.' },

    // === CENTRAL REGION ===
    { id: 9, name: 'Redding', category: 'towns', x: 0.25, y: 0.35,
      description: 'A gold mining town caught between NCR and New Reno influence. Home to the Great Wanamingo Mine, infested with alien creatures.' },
    { id: 51, name: 'Great Wanamingo Mine', category: 'industrial', x: 0.23, y: 0.33,
      description: 'A gold mine in Redding infested with Wanamingos - alien-like creatures of unknown origin. Clearing it is extremely profitable.' },
    { id: 7, name: 'Broken Hills', category: 'towns', x: 0.72, y: 0.40,
      description: 'A mining town where humans, ghouls, and super mutants live in uneasy harmony. Marcus the super mutant serves as sheriff. Rich uranium deposits.' },

    // === NEW RENO AREA ===
    { id: 8, name: 'New Reno', category: 'towns', x: 0.45, y: 0.42,
      description: 'The biggest city in the wasteland - a den of gambling, prostitution, and drugs. Four crime families vie for control: Mordino, Salvatore, Bishop, and Wright.' },
    { id: 66, name: 'Golgotha', category: 'caves', x: 0.48, y: 0.45,
      description: 'A mass grave outside New Reno. Victims of the crime families end up here. Contains hidden treasures.' },
    { id: 63, name: 'EPA', category: 'special', x: 0.52, y: 0.35,
      description: 'Environmental Protection Agency facility. Cut content restored in fan patches. Contains advanced technology and AI companions.' },

    // === VAULT 13 REGION ===
    { id: 21, name: 'Vault 13', category: 'vaults', x: 0.18, y: 0.52,
      description: 'Your ancestor\'s home vault. Now inhabited by intelligent Deathclaws who were experimented on by the Enclave. They possess a G.E.C.K.' },
    { id: 33, name: 'Mariposa Military Base', category: 'military', x: 0.15, y: 0.58,
      description: 'The ruins of the super mutant base from Fallout 1. Excavation crews have uncovered the F.E.V. vats. The Enclave has an interest here.' },
    { id: 65, name: 'New Khans Camp', category: 'tribal', x: 0.58, y: 0.55,
      description: 'Descendants of the Khans from Fallout 1. Reduced to raiding and making drugs. Darion leads them near Vault 15.' },

    // === NCR REGION (South-Central) ===
    { id: 10, name: 'NCR (Shady Sands)', category: 'towns', x: 0.55, y: 0.62,
      description: 'The capital of the New California Republic, grown from the village you saved in Fallout 1. President Tandi leads the growing nation. Vault 15 lies nearby.' },
    { id: 40, name: 'NCR Bazaar', category: 'faction', x: 0.56, y: 0.63,
      description: 'The commercial heart of NCR. Home to shops, the Rangers, and political intrigue.' },
    { id: 11, name: 'Vault 15', category: 'vaults', x: 0.62, y: 0.58,
      description: 'The original vault that spawned Shady Sands. Now occupied by squatters and hiding a dark secret - it\'s the base for a raider group working against NCR.' },

    // === COASTAL REGION (West) - NAVARRO IS HERE ===
    { id: 30, name: 'Navarro', category: 'military', x: 0.05, y: 0.65,
      description: 'Enclave military outpost on the coast. Guards the vertibird refueling depot. Contains advanced technology including power armor. Extremely dangerous.' },

    // === SAN FRANCISCO (Southwest Coast) ===
    { id: 12, name: 'San Francisco', category: 'towns', x: 0.12, y: 0.78,
      description: 'A city divided between the Shi (descendants of Chinese submarine crew) and the Hubologists (a cult). The tanker PMV Valdez can take you to the Enclave.' },
    { id: 41, name: 'Shi Palace', category: 'faction', x: 0.11, y: 0.79,
      description: 'Headquarters of the Shi in San Francisco. They possess advanced research capabilities and a pre-war submarine.' },
    { id: 42, name: 'Hubologist Base', category: 'faction', x: 0.14, y: 0.80,
      description: 'The cult\'s headquarters in San Francisco. They seek to launch a pre-war space shuttle. Led by AHS-9.' },

    // === ENCLAVE (Ocean - Off Coast) ===
    { id: 31, name: 'Enclave Oil Rig', category: 'military', x: 0.02, y: 0.92,
      description: 'The Enclave\'s main base on a pre-war oil platform in the Pacific. President Richardson rules from here. Final destination of the main quest.' },

    // === SPECIAL ENCOUNTERS (Random) ===
    { id: 70, name: 'Cafe of Broken Dreams', category: 'special', x: 0.35, y: 0.50,
      description: 'Special encounter: Meet the original Vault Dweller and recruit Dogmeat.' },
    { id: 71, name: 'Guardian of Forever', category: 'special', x: 0.40, y: 0.30,
      description: 'Special encounter: A time portal that sends you to Vault 13 in Fallout 1. Don\'t break the computer!' },
    { id: 72, name: 'Crashed Whale', category: 'special', x: 0.45, y: 0.08,
      description: 'Special encounter: A whale has mysteriously fallen from the sky. Hitchhiker\'s Guide reference.' },
    { id: 73, name: 'King Arthur\'s Knights', category: 'special', x: 0.75, y: 0.28,
      description: 'Special encounter: Brotherhood paladins on a quest for the Holy Hand Grenade. Monty Python reference.' },
    { id: 74, name: 'Bridge Keeper', category: 'special', x: 0.12, y: 0.45,
      description: 'Special encounter: Answer riddles three to cross the bridge. Another Monty Python reference.' },
    { id: 75, name: 'Unwashed Villagers', category: 'special', x: 0.78, y: 0.50,
      description: 'Special encounter: Fans of the game made into NPCs. They worship the Holy Disc (the game CD).' }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CATEGORIES, locations };
}
