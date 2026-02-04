// Fallout 4 Location Database - The Commonwealth 2287
// Coordinates calibrated to actual game map

const CATEGORIES = {
    settlements: { name: 'Settlements', color: '#00ff99' },
    vaults: { name: 'Vaults', color: '#00ccff' },
    faction: { name: 'Faction HQ', color: '#ff6600' },
    military: { name: 'Military', color: '#ff3333' },
    industrial: { name: 'Factories', color: '#996633' },
    urban: { name: 'Urban Ruins', color: '#666666' },
    landmarks: { name: 'Landmarks', color: '#00ffff' },
    dungeons: { name: 'Dungeons', color: '#9966ff' }
};

const COLLECTIBLE_CATEGORIES = {
    bobbleheads: { name: 'Bobbleheads', color: '#ffcc00' }
};

// Coordinates based on actual Commonwealth map
// Northwest = Sanctuary, Center = Boston, Southeast = coast, Southwest = Glowing Sea
const locations = [
    // === NORTHWEST - SANCTUARY AREA ===
    { id: 1, name: 'Sanctuary Hills', category: 'settlements', x: 0.18, y: 0.08,
      description: 'Your pre-war home. The starting settlement and a major base of operations. Codsworth the robot butler awaits your return.' },
    { id: 20, name: 'Vault 111', category: 'vaults', x: 0.15, y: 0.05,
      description: 'Your vault. Cryogenic preservation experiment. You\'ve been frozen for 210 years. Your spouse was murdered and Shaun kidnapped.' },
    { id: 60, name: 'Museum of Freedom', category: 'landmarks', x: 0.22, y: 0.15,
      description: 'Where you meet Preston Garvey and the Minutemen. Your first power armor and minigun are here.' },

    // === NORTH-CENTRAL ===
    { id: 73, name: 'Parsons State Insane Asylum', category: 'dungeons', x: 0.42, y: 0.12,
      description: 'Jack Cabot\'s quest leads here. His ancient father Lorenzo is imprisoned within. Mysterious artifact quest.' },
    { id: 22, name: 'Vault 75', category: 'vaults', x: 0.48, y: 0.18,
      description: 'Beneath Malden Middle School. Experiment in selective breeding and combat training. The children never knew the truth.' },
    { id: 40, name: 'Corvega Assembly Plant', category: 'industrial', x: 0.50, y: 0.22,
      description: 'Massive car factory overrun by raiders. First major dungeon. Clear it for the Minutemen.' },

    // === NORTHEAST ===
    { id: 43, name: 'Dunwich Borers', category: 'industrial', x: 0.72, y: 0.12,
      description: 'Quarry with Lovecraftian horror connections. Dig deep enough and the visions start. Kremvh\'s Tooth unique weapon.' },
    { id: 61, name: 'Museum of Witchcraft', category: 'landmarks', x: 0.82, y: 0.10,
      description: 'Genuinely terrifying location in Salem. A Deathclaw has made its nest here. The Egg quest.' },
    { id: 44, name: 'Longneck Lukowski\'s Cannery', category: 'industrial', x: 0.78, y: 0.22,
      description: 'Meat processing plant with a terrible secret in the basement. The meat... isn\'t brahmin.' },
    { id: 42, name: 'Saugus Ironworks', category: 'industrial', x: 0.70, y: 0.18,
      description: 'Forgers gang headquarters. They worship the flames. Slag leads them. Dangerous fire traps inside.' },
    { id: 31, name: 'National Guard Training Yard', category: 'military', x: 0.65, y: 0.25,
      description: 'Military facility with power armor and supplies. Heavily defended by feral ghouls.' },

    // === WEST ===
    { id: 30, name: 'Fort Hagen', category: 'military', x: 0.15, y: 0.40,
      description: 'Pre-war military base. Kellogg, the man who killed your spouse and took Shaun, has been tracked here.' },
    { id: 21, name: 'Vault 81', category: 'vaults', x: 0.28, y: 0.48,
      description: 'A functioning vault that trades with outsiders. Secretly contains Curie, a Miss Nanny robot. A hidden section holds dark secrets.' },

    // === CENTRAL BOSTON ===
    { id: 2, name: 'Diamond City', category: 'settlements', x: 0.48, y: 0.52,
      description: 'The Great Green Jewel - a settlement built in Fenway Park. The largest city in the Commonwealth. Mayor McDonough rules, but something\'s not right.' },
    { id: 50, name: 'Boston Common', category: 'urban', x: 0.45, y: 0.50,
      description: 'Historic park, start of the Freedom Trail. Swan the super mutant behemoth lurks in the pond.' },
    { id: 54, name: 'Hubris Comics', category: 'urban', x: 0.42, y: 0.52,
      description: 'Comic publisher HQ. Contains the Silver Shroud costume for Kent Connolly\'s quest.' },
    { id: 64, name: 'Boston Public Library', category: 'landmarks', x: 0.44, y: 0.55,
      description: 'Overrun by super mutants. Contains Intelligence bobblehead. Return the overdue book!' },
    { id: 53, name: 'Trinity Tower', category: 'urban', x: 0.46, y: 0.48,
      description: 'Skyscraper with super mutants. Strong the companion and Rex Goodman are held prisoner at the top.' },
    { id: 3, name: 'Goodneighbor', category: 'settlements', x: 0.52, y: 0.50,
      description: 'A town of outcasts ruled by Mayor Hancock, a ghoul. "Of the people, for the people." Home to the Memory Den and the Third Rail bar.' },
    { id: 24, name: 'Vault 114', category: 'vaults', x: 0.50, y: 0.52,
      description: 'Unfinished vault beneath Park Street Station. Social experiment putting wealthy in poverty conditions. Nick Valentine is held here.' },
    { id: 10, name: 'The Institute', category: 'faction', x: 0.50, y: 0.48,
      description: 'Hidden beneath CIT ruins. The boogeyman of the Commonwealth creates synths. Your son Shaun leads as Father. Teleportation required for entry.' },
    { id: 41, name: 'Mass Fusion Building', category: 'industrial', x: 0.48, y: 0.50,
      description: 'Pre-war energy corporation HQ. Contains a beryllium agitator critical to the main quest. Faction choice point.' },
    { id: 12, name: 'Railroad HQ', category: 'faction', x: 0.52, y: 0.45,
      description: 'Hidden beneath the Old North Church. "Follow the Freedom Trail." Desdemona leads the synth liberation movement.' },
    { id: 52, name: 'Old North Church', category: 'urban', x: 0.52, y: 0.44,
      description: 'Historic church, end of the Freedom Trail. The Railroad operates beneath it.' },
    { id: 51, name: 'Faneuil Hall', category: 'urban', x: 0.54, y: 0.46,
      description: 'Historic meeting hall, now super mutant territory. Part of the Freedom Trail.' },
    { id: 63, name: 'Pickman Gallery', category: 'landmarks', x: 0.56, y: 0.44,
      description: 'Art gallery of a serial killer who targets raiders. Is Pickman a monster or a hero? His knife is unique.' },
    { id: 4, name: 'Bunker Hill', category: 'settlements', x: 0.55, y: 0.38,
      description: 'A fortified trading post at the base of the historic monument. Caravans regularly pass through. Secretly harbors synth refugees.' },
    { id: 55, name: 'Mass Bay Medical Center', category: 'urban', x: 0.52, y: 0.55,
      description: 'Hospital filled with super mutants. MacCready\'s son needs medicine from here.' },

    // === EAST/COAST ===
    { id: 62, name: 'USS Constitution', category: 'landmarks', x: 0.62, y: 0.35,
      description: 'Historic ship now crewed by robots led by Ironsides. Help them launch the ship! One of the game\'s best quests.' },
    { id: 11, name: 'The Prydwen', category: 'faction', x: 0.72, y: 0.48,
      description: 'Brotherhood of Steel\'s massive airship, arrives after "Reunions." Elder Maxson commands. Docked at Boston Airport.' },
    { id: 13, name: 'Boston Airport', category: 'faction', x: 0.70, y: 0.52,
      description: 'Brotherhood of Steel forward base. The Prydwen is moored here. Liberty Prime is being rebuilt in the ruins.' },
    { id: 32, name: 'Fort Strong', category: 'military', x: 0.78, y: 0.55,
      description: 'Super mutant stronghold on an island. Contains Fat Man mini-nukes. Brotherhood assault target.' },
    { id: 5, name: 'The Castle', category: 'settlements', x: 0.75, y: 0.65,
      description: 'Fort Independence - the historic Minutemen headquarters. Retake it from the Mirelurks to restore the Minutemen to glory.' },

    // === SOUTH ===
    { id: 71, name: 'Gunners Plaza', category: 'dungeons', x: 0.52, y: 0.62,
      description: 'GNN TV station, now Gunner headquarters. Their commander broadcasts threats across the Commonwealth.' },
    { id: 70, name: 'Jamaica Plain', category: 'dungeons', x: 0.48, y: 0.72,
      description: 'Town with a legendary treasure hunt. The "treasure" is hilariously disappointing but the journey is worthwhile.' },
    { id: 72, name: 'Quincy Ruins', category: 'dungeons', x: 0.62, y: 0.80,
      description: 'Where the Minutemen fell. Gunners massacred them here. Clint the traitor awaits justice.' },

    // === SOUTHEAST COAST ===
    { id: 'atom_cats', name: 'Atom Cats Garage', category: 'settlements', x: 0.60, y: 0.78,
      description: 'Power armor enthusiasts who dig cool threads and helping out. Rowdy runs the shop.' },
    { id: 'spectacle', name: 'Spectacle Island', category: 'settlements', x: 0.85, y: 0.72,
      description: 'Large island that can become a settlement after dealing with the Mirelurks. Luck bobblehead here.' },

    // === SOUTHWEST - GLOWING SEA ===
    { id: 23, name: 'Vault 95', category: 'vaults', x: 0.25, y: 0.88,
      description: 'Addiction rehabilitation vault - then Vault-Tec introduced drugs after 5 years. Now a Gunner stronghold. Cait\'s personal quest.' },
    { id: 80, name: 'Crater of Atom', category: 'landmarks', x: 0.22, y: 0.92,
      description: 'Ground zero of the nuclear bomb that created the Glowing Sea. The Children of Atom worship here. Virgil is nearby.' },
    { id: 81, name: 'Rocky Cave', category: 'dungeons', x: 0.18, y: 0.88,
      description: 'Brian Virgil\'s hideout. The ex-Institute scientist holds the key to teleportation into the Institute.' },
    { id: 33, name: 'Sentinel Site', category: 'military', x: 0.20, y: 0.95,
      description: 'Pre-war nuclear missile silo in the Glowing Sea. Contains a Mark 28 nuclear bomb for Liberty Prime.' }
];

// Bobblehead collectibles with corrected coordinates
const collectibles = {
    bobbleheads: [
        { id: 'bb_str', name: 'Strength Bobblehead', x: 0.48, y: 0.50, location: 'Mass Fusion Building', description: 'On a statue overlooking the lobby.' },
        { id: 'bb_per', name: 'Perception Bobblehead', x: 0.22, y: 0.15, location: 'Museum of Freedom', description: 'On Preston\'s desk.' },
        { id: 'bb_end', name: 'Endurance Bobblehead', x: 0.30, y: 0.58, location: 'Poseidon Energy', description: 'In the central metal hut.' },
        { id: 'bb_cha', name: 'Charisma Bobblehead', x: 0.42, y: 0.12, location: 'Parsons State Insane Asylum', description: 'Jack Cabot\'s office.' },
        { id: 'bb_int', name: 'Intelligence Bobblehead', x: 0.44, y: 0.55, location: 'Boston Public Library', description: 'On the computer bank.' },
        { id: 'bb_agi', name: 'Agility Bobblehead', x: 0.82, y: 0.65, location: 'Wreck of FMS Northern Star', description: 'On the bow of the ship.' },
        { id: 'bb_lck', name: 'Luck Bobblehead', x: 0.85, y: 0.72, location: 'Spectacle Island', description: 'In a locker on a boat.' },
        { id: 'bb_barter', name: 'Barter Bobblehead', x: 0.78, y: 0.22, location: 'Longneck Lukowski\'s Cannery', description: 'On the metal catwalk.' },
        { id: 'bb_bigguns', name: 'Big Guns Bobblehead', x: 0.25, y: 0.88, location: 'Vault 95', description: 'In the living quarters.' },
        { id: 'bb_energy', name: 'Energy Weapons Bobblehead', x: 0.15, y: 0.40, location: 'Fort Hagen Command Center', description: 'On a table in the kitchen.' },
        { id: 'bb_explosives', name: 'Explosives Bobblehead', x: 0.70, y: 0.18, location: 'Saugus Ironworks', description: 'On a control panel.' },
        { id: 'bb_lockpick', name: 'Lock Picking Bobblehead', x: 0.56, y: 0.44, location: 'Pickman Gallery', description: 'In the final tunnel.' },
        { id: 'bb_medicine', name: 'Medicine Bobblehead', x: 0.28, y: 0.48, location: 'Vault 81', description: 'In Curie\'s chamber.' },
        { id: 'bb_melee', name: 'Melee Bobblehead', x: 0.46, y: 0.48, location: 'Trinity Tower', description: 'At the top with Strong.' },
        { id: 'bb_repair', name: 'Repair Bobblehead', x: 0.50, y: 0.22, location: 'Corvega Assembly Plant', description: 'On the southwest roof.' },
        { id: 'bb_science', name: 'Science Bobblehead', x: 0.48, y: 0.18, location: 'Vault 75', description: 'On the desk in the science lab.' },
        { id: 'bb_smallguns', name: 'Small Guns Bobblehead', x: 0.52, y: 0.62, location: 'Gunners Plaza', description: 'On the broadcast desk.' },
        { id: 'bb_sneak', name: 'Sneak Bobblehead', x: 0.72, y: 0.12, location: 'Dunwich Borers', description: 'On a desk by Area 4 sign.' },
        { id: 'bb_speech', name: 'Speech Bobblehead', x: 0.50, y: 0.52, location: 'Vault 114', description: 'In the Overseer\'s office.' },
        { id: 'bb_unarmed', name: 'Unarmed Bobblehead', x: 0.60, y: 0.78, location: 'Atom Cats Garage', description: 'On the hood of the car.' }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CATEGORIES, COLLECTIBLE_CATEGORIES, locations, collectibles };
}
