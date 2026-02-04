// Fallout New Vegas Location Database - Mojave Wasteland 2281
// Coordinates calibrated to actual game map

const CATEGORIES = {
    settlements: { name: 'Settlements', color: '#ff9f0a' },
    ncr: { name: 'NCR Locations', color: '#bf8f3f' },
    legion: { name: 'Legion Territory', color: '#8b0000' },
    casino: { name: 'Casinos', color: '#ffd700' },
    military: { name: 'Military', color: '#ff6600' },
    caves: { name: 'Caves & Mines', color: '#996633' },
    vaults: { name: 'Vaults', color: '#ff9f0a' },
    landmarks: { name: 'Landmarks', color: '#00ffff' },
    faction: { name: 'Faction HQ', color: '#9966ff' }
};

const COLLECTIBLE_CATEGORIES = {
    snowglobes: { name: 'Snow Globes', color: '#ffffff' }
};

// Coordinates based on actual Mojave Wasteland map
// Vegas is roughly center-north, Hoover Dam far east, Goodsprings southwest
const locations = [
    // === VEGAS STRIP & FREESIDE (Center-North) ===
    { id: 5, name: 'The Strip', category: 'casino', x: 0.42, y: 0.28,
      description: 'New Vegas itself - Mr. House\'s crown jewel. Three major casinos operate here: The Tops, Gomorrah, and the Ultra-Luxe. The Lucky 38 tower looms above all.' },
    { id: 30, name: 'Lucky 38', category: 'casino', x: 0.42, y: 0.27,
      description: 'Mr. House\'s fortress-casino on the Strip. The tower remained closed for 200 years until the Courier arrives. House rules Vegas from here.' },
    { id: 31, name: 'The Tops', category: 'casino', x: 0.43, y: 0.29,
      description: 'Casino run by the Chairmen, fronted by Benny. Ring-a-ding-ding, baby! This is where you\'ll confront the man who shot you.' },
    { id: 32, name: 'Gomorrah', category: 'casino', x: 0.41, y: 0.29,
      description: 'Casino run by the Omertas. A den of vice hiding darker secrets. The family is plotting something big.' },
    { id: 33, name: 'Ultra-Luxe', category: 'casino', x: 0.44, y: 0.28,
      description: 'The most exclusive casino, run by the White Glove Society. Rumors persist about their pre-civilization... dietary habits.' },
    { id: 4, name: 'Freeside', category: 'settlements', x: 0.45, y: 0.32,
      description: 'The slums outside the Vegas Strip. Home to the Kings gang, the Followers of the Apocalypse, and many desperate souls. The Atomic Wrangler casino operates here.' },
    { id: 34, name: 'Atomic Wrangler', category: 'casino', x: 0.46, y: 0.33,
      description: 'Freeside\'s casino, run by the Garret twins. Lower stakes gambling and various services of questionable legality.' },
    { id: 44, name: 'Old Mormon Fort', category: 'faction', x: 0.45, y: 0.30,
      description: 'Followers of the Apocalypse headquarters in Freeside. They provide medical care and education to the poor.' },
    { id: 7, name: 'North Vegas Square', category: 'settlements', x: 0.40, y: 0.25,
      description: 'A poor area north of Freeside. Squatters and the desperate make their homes here.' },
    { id: 6, name: 'Westside', category: 'settlements', x: 0.38, y: 0.32,
      description: 'A small, self-sufficient community west of Vegas. They grow their own food and defend themselves. Mean Sonofabitch the super mutant lives here.' },
    { id: 63, name: 'Vault 21', category: 'vaults', x: 0.42, y: 0.29,
      description: 'A vault where all conflicts were resolved by gambling. Now a hotel on the Strip. Sarah runs it for Mr. House.' },

    // === CAMP McCARRAN AREA ===
    { id: 10, name: 'Camp McCarran', category: 'ncr', x: 0.40, y: 0.35,
      description: 'NCR\'s main military base in the Mojave, built in the pre-war airport. Colonel Hsu commands. Major operations against the Fiends and Legion are coordinated here.' },
    { id: 53, name: 'REPCONN Headquarters', category: 'military', x: 0.38, y: 0.38,
      description: 'Corporate offices of REPCONN Aerospace. Contains pre-war rocket technology and a unique plasma rifle.' },
    { id: 45, name: 'Gun Runners', category: 'faction', x: 0.48, y: 0.40,
      description: 'Premier weapons manufacturer in the Mojave. Isaac runs the operation. Best guns and ammo in the wasteland.' },
    { id: 60, name: 'Vault 3', category: 'vaults', x: 0.35, y: 0.38,
      description: 'A vault taken over by the Fiends gang. The original dwellers were killed. Motor-Runner leads the Fiends from here.' },

    // === NORTHWEST - JACOBSTOWN/RED ROCK ===
    { id: 42, name: 'Jacobstown', category: 'faction', x: 0.15, y: 0.12,
      description: 'Super mutant and nightkin refuge led by Marcus. Dr. Henry researches a cure for the nightkin\'s schizophrenia.' },
    { id: 41, name: 'Red Rock Canyon', category: 'faction', x: 0.18, y: 0.25,
      description: 'Home of the Great Khans. Papa Khan leads the tribe. They have an uneasy alliance with the Legion.' },
    { id: 73, name: 'Cazador Nest', category: 'caves', x: 0.20, y: 0.18,
      description: 'Breeding ground for cazadores, deadly mutant tarantula hawks. Their poison is extremely dangerous.' },
    { id: 64, name: 'Vault 22', category: 'vaults', x: 0.22, y: 0.30,
      description: 'Botanical research vault overrun by spore plants. The experiments created dangerous plant-human hybrids.' },

    // === CENTRAL - QUARRY/BLACK MOUNTAIN ===
    { id: 74, name: 'Sloan', category: 'settlements', x: 0.32, y: 0.38,
      description: 'Mining town shut down due to Deathclaws in Quarry Junction. The workers are stuck here.' },
    { id: 71, name: 'Quarry Junction', category: 'caves', x: 0.30, y: 0.35,
      description: 'Limestone quarry infested with Deathclaws. One of the most dangerous areas in the game. Legendary Deathclaw Mother here.' },
    { id: 52, name: 'Black Mountain', category: 'military', x: 0.35, y: 0.42,
      description: 'Radio broadcast tower occupied by Tabitha\'s super mutants. Neil the mutant may help you. Raul the ghoul is prisoner here.' },
    { id: 62, name: 'Vault 19', category: 'vaults', x: 0.28, y: 0.48,
      description: 'Divided into Red and Blue sectors to study paranoia. Now occupied by Powder Gangers led by Samuel Cooke.' },
    { id: 40, name: 'Hidden Valley Bunker', category: 'faction', x: 0.32, y: 0.55,
      description: 'Brotherhood of Steel headquarters in the Mojave. Elder McNamara leads. They\'re under lockdown due to NCR presence.' },

    // === HELIOS/NOVAC AREA (Center-South) ===
    { id: 50, name: 'HELIOS One', category: 'military', x: 0.45, y: 0.55,
      description: 'Poseidon Energy solar plant. NCR is trying to get it working. Actually contains Archimedes II, an orbital weapon platform.' },
    { id: 61, name: 'Vault 11', category: 'vaults', x: 0.50, y: 0.60,
      description: 'Experiment in sacrifice - each year the dwellers had to choose someone to die. The horrible truth awaits inside.' },
    { id: 3, name: 'Novac', category: 'settlements', x: 0.58, y: 0.62,
      description: 'A settlement built around a dinosaur-shaped thermometer. Home to Boone, a former NCR sniper with a tragic past. The Repconn Test Site is nearby.' },
    { id: 51, name: 'Repconn Test Site', category: 'military', x: 0.52, y: 0.65,
      description: 'Pre-war rocket testing facility. Now occupied by ghouls who believe they\'re destined for the "Far Beyond." Jason Bright leads them.' },

    // === NORTHEAST - NELLIS/LAKE MEAD ===
    { id: 43, name: 'Nellis Air Force Base', category: 'faction', x: 0.62, y: 0.12,
      description: 'Home of the Boomers, artillery-loving vault dwellers. They\'re restoring a B-29 bomber from Lake Mead.' },
    { id: 65, name: 'Vault 34', category: 'vaults', x: 0.58, y: 0.22,
      description: 'A vault with an oversized armory. Radiation has killed most dwellers. The Boomers originated here. All-American rifle inside.' },
    { id: 13, name: 'Camp Golf', category: 'ncr', x: 0.65, y: 0.18,
      description: 'NCR ranger training facility at a pre-war golf resort. Chief Hanlon oversees operations. The Misfits squad is stationed here.' },
    { id: 79, name: 'Bitter Springs', category: 'ncr', x: 0.68, y: 0.10,
      description: 'Refugee camp and site of the NCR massacre of Great Khans. Boone\'s trauma stems from here.' },
    { id: 78, name: 'Ranger Station Alpha', category: 'ncr', x: 0.55, y: 0.15,
      description: 'One of several NCR ranger outposts monitoring the region.' },

    // === HOOVER DAM & BOULDER CITY (Far East) ===
    { id: 11, name: 'Hoover Dam', category: 'ncr', x: 0.88, y: 0.38,
      description: 'The most important strategic location in the Mojave. Provides power and water to the region. The final battle for the Mojave will be fought here.' },
    { id: 16, name: 'Boulder City', category: 'ncr', x: 0.75, y: 0.42,
      description: 'Site of an NCR victory over the Legion. Now mostly ruins. Great Khans are holding NCR hostages here.' },

    // === LEGION TERRITORY (East/Southeast) ===
    { id: 21, name: 'The Fort', category: 'legion', x: 0.92, y: 0.52,
      description: 'Fortification Hill - Caesar\'s main base in the Mojave. The Legate\'s camp is here. A sealed bunker contains powerful pre-war technology.' },
    { id: 20, name: 'Cottonwood Cove', category: 'legion', x: 0.85, y: 0.65,
      description: 'Legion forward camp on the Colorado River. Cursor Lucullus can ferry you to the Fort. Slaves are processed here.' },
    { id: 22, name: 'Nelson', category: 'legion', x: 0.72, y: 0.62,
      description: 'Former NCR town captured by the Legion. Dead Man\'s territory. NCR soldiers are crucified here as a warning.' },
    { id: 12, name: 'Camp Forlorn Hope', category: 'ncr', x: 0.70, y: 0.58,
      description: 'NCR\'s forward operating base against Nelson. Understaffed and undersupplied. The medical situation is dire.' },
    { id: 15, name: 'Camp Searchlight', category: 'ncr', x: 0.68, y: 0.75,
      description: 'Former NCR camp destroyed by Legion dirty bombs. Now crawling with feral ghouls and radiation. Valuable loot remains.' },
    { id: 72, name: 'Deathclaw Promontory', category: 'caves', x: 0.95, y: 0.60,
      description: 'A peninsula crawling with Deathclaws. Contains unique armor but reaching it is nearly suicidal.' },
    { id: 76, name: 'Yangtze Memorial', category: 'landmarks', x: 0.72, y: 0.55,
      description: 'Memorial to Chinese internment. Hints at pre-war America\'s darker history.' },

    // === SOUTHWEST - GOODSPRINGS/PRIMM AREA ===
    { id: 1, name: 'Goodsprings', category: 'settlements', x: 0.25, y: 0.72,
      description: 'A small farming and ranching community where you wake up after being shot. Doc Mitchell saves your life here. Sunny Smiles can teach you survival basics.' },
    { id: 70, name: 'Goodsprings Cemetery', category: 'landmarks', x: 0.24, y: 0.70,
      description: 'Where you were buried alive by Benny. Victor the robot dug you out. Your grave is still here.' },
    { id: 77, name: 'NCRCF', category: 'ncr', x: 0.28, y: 0.78,
      description: 'NCR Correctional Facility - the prison that the Powder Gangers escaped from. Now their headquarters.' },
    { id: 75, name: 'Jean Sky Diving', category: 'landmarks', x: 0.22, y: 0.80,
      description: 'Pre-war skydiving business. Now a Powder Ganger checkpoint on the road north.' },
    { id: 2, name: 'Primm', category: 'settlements', x: 0.30, y: 0.85,
      description: 'A small town with the Vikki and Vance Casino. Currently lawless after convicts from the nearby prison escaped. ED-E the robot companion can be found here.' },
    { id: 35, name: 'Vikki and Vance Casino', category: 'casino', x: 0.30, y: 0.84,
      description: 'Primm\'s casino, themed around the lesser-known outlaws Vikki and Vance. Currently closed due to the town\'s problems.' },
    { id: 14, name: 'Mojave Outpost', category: 'ncr', x: 0.15, y: 0.92,
      description: 'NCR\'s southern checkpoint. Cass the caravan merchant waits here. The statue of the two rangers shaking hands is iconic.' },

    // === SOUTH - NIPTON AREA ===
    { id: 23, name: 'Nipton', category: 'legion', x: 0.48, y: 0.85,
      description: 'Town destroyed by the Legion as punishment for its corruption. Vulpes Inculta leaves the Courier alive to spread the message.' }
];

// Snow Globe collectibles - coordinates match their locations
const collectibles = {
    snowglobes: [
        { id: 'sg_goodsprings', name: 'Snow Globe - Goodsprings', x: 0.24, y: 0.70,
          location: 'Goodsprings Cemetery', description: 'On a grave near the water tower.' },
        { id: 'sg_hoover', name: 'Snow Globe - Hoover Dam', x: 0.88, y: 0.38,
          location: 'Hoover Dam Visitor Center', description: 'On the welcome desk in the visitor center.' },
        { id: 'sg_mormon', name: 'Snow Globe - Mormon Fort', x: 0.45, y: 0.30,
          location: 'Old Mormon Fort', description: 'Upstairs in the tower, on a shelf in Julie Farkas\' office.' },
        { id: 'sg_jacobstown', name: 'Snow Globe - Mt. Charleston', x: 0.15, y: 0.12,
          location: 'Jacobstown Lodge', description: 'On the reception desk in the lodge.' },
        { id: 'sg_nellis', name: 'Snow Globe - Nellis AFB', x: 0.62, y: 0.12,
          location: 'Nellis Boomer Museum', description: 'On a table to the right as you enter.' },
        { id: 'sg_test', name: 'Snow Globe - Test Site', x: 0.42, y: 0.27,
          location: 'Lucky 38 Cocktail Lounge', description: 'Behind the cash register in the cocktail lounge.' },
        { id: 'sg_strip', name: 'Snow Globe - The Strip', x: 0.42, y: 0.29,
          location: 'Vault 21', description: 'In Sarah\'s room, on a nightstand. Room is locked (Average).' }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CATEGORIES, COLLECTIBLE_CATEGORIES, locations, collectibles };
}
