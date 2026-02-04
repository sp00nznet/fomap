// Fallout 1 Location Database
// Southern California Wasteland - 2161

const CATEGORIES = {
    vaults: { name: 'Vaults', color: '#ffb000' },
    towns: { name: 'Towns', color: '#ffb000' },
    military: { name: 'Military', color: '#ff6600' },
    raiders: { name: 'Raider Camps', color: '#ff3333' },
    faction: { name: 'Faction HQ', color: '#9966ff' },
    caves: { name: 'Caves & Ruins', color: '#996633' },
    special: { name: 'Special Encounters', color: '#00ffff' }
};

// Fallout 1 map is roughly 20x20 grid representing SoCal
// Coordinates normalized 0-1
const locations = [
    // === VAULTS ===
    { id: 1, name: 'Vault 13', category: 'vaults', x: 0.32, y: 0.28,
      description: 'Your home vault. The water chip has failed and you must find a replacement within 150 days or your vault dwellers will die of thirst. Located in the mountains of southern California.' },
    { id: 2, name: 'Vault 15', category: 'vaults', x: 0.45, y: 0.35,
      description: 'An abandoned vault overrun by raiders. The water chip may be here. Home to giant rats and radscorpions. The vault was ravaged by internal conflict, leading to the exodus that formed Shady Sands, the Khans, the Vipers, and the Jackals.' },
    { id: 3, name: 'Vault 12', category: 'vaults', x: 0.55, y: 0.72,
      description: 'Located beneath Necropolis. The vault door was designed to never close properly, exposing inhabitants to radiation. This created the ghoul population of Necropolis.' },

    // === MAJOR TOWNS ===
    { id: 10, name: 'Shady Sands', category: 'towns', x: 0.42, y: 0.38,
      description: 'A small farming community founded by former Vault 15 dwellers. Led by Aradesh. His daughter Tandi can join you as a companion. Known for brahmin herding and facing radscorpion attacks.' },
    { id: 11, name: 'Junktown', category: 'towns', x: 0.38, y: 0.55,
      description: 'A fortified trading town built from scrap metal and junk. Ruled by Mayor Killian Darkwater, though the crime boss Gizmo seeks control. Features the Skum Pitt bar and Crash House hotel.' },
    { id: 12, name: 'The Hub', category: 'towns', x: 0.50, y: 0.65,
      description: 'The largest trade center in the wasteland. Divided into districts: Downtown, Old Town, the Heights, and the Water Merchants area. Home to the Far Go Traders, Crimson Caravan, and Water Merchants.' },
    { id: 13, name: 'Necropolis', category: 'towns', x: 0.55, y: 0.72,
      description: 'The City of the Dead. A ruined city inhabited by ghouls, built over Vault 12. Set, the ghoul leader, rules the surface while the underground is home to peaceful glowing ones. The super mutants seek the vault here.' },
    { id: 14, name: 'Boneyard', category: 'towns', x: 0.35, y: 0.85,
      description: 'The ruins of Los Angeles. Divided into Adytum (a walled settlement), the downtown ruins, and the Fortress of the Gun Runners. Home to the Blades gang and the tyrannical Regulators.' },
    { id: 15, name: 'Adytum', category: 'towns', x: 0.33, y: 0.83,
      description: 'A walled community within the Boneyard. Seemingly peaceful but ruled by the corrupt Regulators who exploit the citizens. The Blades outside seek to free the people.' },

    // === MILITARY ===
    { id: 20, name: 'Mariposa Military Base', category: 'military', x: 0.22, y: 0.35,
      description: 'Pre-war military installation where the F.E.V. experiments took place. Now the headquarters of the Master\'s super mutant army. The Lieutenant oversees operations here. Extremely dangerous.' },
    { id: 21, name: 'West Tek Research Facility', category: 'military', x: 0.28, y: 0.30,
      description: 'Also known as "The Glow." A heavily irradiated crater containing the ruins of West Tek, where F.E.V. was originally developed. The Brotherhood sends initiates here as a test.' },
    { id: 22, name: 'The Glow', category: 'military', x: 0.28, y: 0.30,
      description: 'The irradiated ruins of West Tek Research Facility. Requires Rad-X and RadAway to survive. Contains power armor and the Brotherhood holodisks proving F.E.V. origins.' },

    // === FACTION HQ ===
    { id: 30, name: 'Lost Hills Bunker', category: 'faction', x: 0.25, y: 0.52,
      description: 'Underground headquarters of the Brotherhood of Steel. Founded by Captain Roger Maxson after deserting Mariposa. They hoard pre-war technology and train elite soldiers in power armor.' },
    { id: 31, name: 'The Cathedral', category: 'faction', x: 0.40, y: 0.88,
      description: 'The headquarters of the Children of the Cathedral, a religious front for the Master. The Master himself resides in the vault beneath. The cult spreads across the wasteland, secretly working for super mutant supremacy.' },
    { id: 32, name: 'LA Vault (Master\'s Lair)', category: 'faction', x: 0.40, y: 0.90,
      description: 'The Vault beneath the Cathedral where the Master resides. A horrifying amalgamation of flesh and technology, the Master seeks to evolve humanity through F.E.V. transformation into super mutants.' },

    // === RAIDER CAMPS ===
    { id: 40, name: 'Khan Base', category: 'raiders', x: 0.52, y: 0.42,
      description: 'Camp of the Khans, a raider gang descended from Vault 15. Led by Garl Death-Hand. They kidnap and enslave wastelanders. Tandi of Shady Sands may be held captive here.' },
    { id: 41, name: 'Raider Camp', category: 'raiders', x: 0.48, y: 0.30,
      description: 'A smaller raider encampment in the northern wastes. Dangerous for unprepared travelers.' },

    // === CAVES & RUINS ===
    { id: 50, name: 'Radscorpion Caves', category: 'caves', x: 0.40, y: 0.40,
      description: 'Cave system near Shady Sands infested with giant radscorpions. Clearing these caves is one of the first quests available.' },
    { id: 51, name: 'Deathclaw Lair', category: 'caves', x: 0.55, y: 0.60,
      description: 'A cave containing deadly Deathclaws. The mother Deathclaw guards her eggs here. Extremely dangerous without heavy weaponry.' },
    { id: 52, name: 'Hub Underground', category: 'caves', x: 0.51, y: 0.66,
      description: 'The thieves guild operates in tunnels beneath the Hub. Loxley leads the underground criminal network.' },
    { id: 53, name: 'Followers Library', category: 'caves', x: 0.37, y: 0.86,
      description: 'The Followers of the Apocalypse maintain a library in the Boneyard, preserving pre-war knowledge. Nicole leads them in their mission of peace and education.' },

    // === SPECIAL ENCOUNTERS ===
    { id: 60, name: 'Tardis', category: 'special', x: 0.15, y: 0.50,
      description: 'Special encounter: A British police box that disappears when approached. Doctor Who reference.' },
    { id: 61, name: 'Crashed UFO', category: 'special', x: 0.70, y: 0.25,
      description: 'Special encounter: An alien spacecraft crash site. Contains the alien blaster and power cells.' },
    { id: 62, name: 'Bob\'s Pre-Owned Car Mart', category: 'special', x: 0.60, y: 0.45,
      description: 'Special encounter: A ruined car dealership with a functioning Red Ryder BB gun.' },
    { id: 63, name: 'Patrick the Celt', category: 'special', x: 0.25, y: 0.70,
      description: 'Special encounter: A strange man who speaks of ancient Celtic prophecies.' }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CATEGORIES, locations };
}
