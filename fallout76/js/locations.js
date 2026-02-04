// Fallout 76 Location Database - Appalachia 2102

const CATEGORIES = {
    forest: { name: 'The Forest', color: '#228b22' },
    toxic: { name: 'Toxic Valley', color: '#7fff00' },
    ash: { name: 'Ash Heap', color: '#696969' },
    savage: { name: 'Savage Divide', color: '#8b4513' },
    mire: { name: 'The Mire', color: '#556b2f' },
    bog: { name: 'Cranberry Bog', color: '#8b0000' },
    vaults: { name: 'Vaults', color: '#00aaff' },
    workshop: { name: 'Workshops', color: '#ffd700' }
};

const locations = [
    // === THE FOREST ===
    { id: 1, name: 'Vault 76', category: 'vaults', x: 0.22, y: 0.28,
      description: 'Your vault and starting location. "Reclamation Day" - October 23, 2102. You emerge 25 years after the bombs fell to rebuild America.' },
    { id: 2, name: 'Flatwoods', category: 'forest', x: 0.28, y: 0.35,
      description: 'First town you\'ll encounter. The Responders made this their headquarters. Learn the basics of survival here.' },
    { id: 3, name: 'Morgantown', category: 'forest', x: 0.35, y: 0.22,
      description: 'University town overrun by Scorched. Vault-Tec University is here. The Responders fell here fighting the Scorched Plague.' },
    { id: 4, name: 'Charleston', category: 'forest', x: 0.32, y: 0.55,
      description: 'The destroyed state capital. The Christmas Flood wiped out survivors here. The Capitol Building still stands.' },
    { id: 5, name: 'Grafton', category: 'toxic', x: 0.42, y: 0.18,
      description: 'Industrial town in the Toxic Valley. Home to the Grafton Monster, a horrifying cryptid. Grafton Steel dominates.' },
    { id: 6, name: 'Point Pleasant', category: 'forest', x: 0.18, y: 0.52,
      description: 'The Mothman Museum. Learn about West Virginia\'s most famous cryptid. The Mothman is real here.' },
    { id: 7, name: 'Helvetia', category: 'forest', x: 0.38, y: 0.48,
      description: 'Swiss-German community. The Fasnacht Day event happens here. Robots still run the parade.' },

    // === TOXIC VALLEY ===
    { id: 10, name: 'Wavy Willard\'s Water Park', category: 'toxic', x: 0.38, y: 0.12,
      description: 'Abandoned water park in the Toxic Valley. Snallygasters and other mutants lurk in the slides.' },
    { id: 11, name: 'Clarksburg', category: 'toxic', x: 0.45, y: 0.15,
      description: 'Town in the Toxic Valley. Super mutants have taken over. The Hunting Lodge is nearby.' },
    { id: 12, name: 'Eastern Regional Penitentiary', category: 'toxic', x: 0.52, y: 0.10,
      description: 'Pre-war prison now overrun by super mutants. High-level enemies and good loot.' },

    // === ASH HEAP ===
    { id: 20, name: 'Mount Blair', category: 'ash', x: 0.18, y: 0.75,
      description: 'Massive mining excavator in the Ash Heap. The largest machine in the game. Activating it triggers events.' },
    { id: 21, name: 'Welch', category: 'ash', x: 0.22, y: 0.78,
      description: 'Mining town devastated by automation. The roots of the Appalachian conflict lie here.' },
    { id: 22, name: 'Lewisburg', category: 'ash', x: 0.28, y: 0.72,
      description: 'Town on the edge of the Ash Heap. Relatively intact but dangerous.' },
    { id: 23, name: 'Beckley', category: 'ash', x: 0.25, y: 0.82,
      description: 'Mining town in the Ash Heap. Mole miners patrol the ruins.' },
    { id: 24, name: 'Garrahan Mining HQ', category: 'ash', x: 0.20, y: 0.70,
      description: 'Corporate headquarters for Garrahan Mining. Contains the Excavator Power Armor plans.' },

    // === SAVAGE DIVIDE ===
    { id: 30, name: 'Top of the World', category: 'savage', x: 0.55, y: 0.38,
      description: 'Ski resort controlled by Rose, a raider robot. She\'ll help you track down the Scorched killers.' },
    { id: 31, name: 'The Whitespring Resort', category: 'savage', x: 0.58, y: 0.55,
      description: 'Luxury resort with functioning robot staff. The Congressional Bunker lies beneath. MODUS AI awaits.' },
    { id: 32, name: 'Seneca Rocks', category: 'savage', x: 0.62, y: 0.35,
      description: 'Distinctive rock formation. Raider territory. Good views of the divide.' },
    { id: 33, name: 'Blackwater Mine', category: 'savage', x: 0.65, y: 0.45,
      description: 'Uranium mine infested with mole miners. Highly radioactive. Part of the main quest.' },
    { id: 34, name: 'National Isolated Radio Array', category: 'savage', x: 0.70, y: 0.30,
      description: 'Communication array in the mountains. Super mutants have claimed it.' },
    { id: 35, name: 'Site Alpha', category: 'savage', x: 0.52, y: 0.52,
      description: 'Nuclear missile silo. Part of the endgame content. Launch nukes from here.' },
    { id: 36, name: 'Pleasant Valley Ski Resort', category: 'savage', x: 0.48, y: 0.42,
      description: 'Another ski resort, overrun by Scorched. The Pleasant Valley Claim tickets lead to rewards.' },

    // === THE MIRE ===
    { id: 40, name: 'Harper\'s Ferry', category: 'mire', x: 0.82, y: 0.35,
      description: 'Historic town, last stand of the Free States. Learn about their fight against government overreach.' },
    { id: 41, name: 'Dyer Chemical', category: 'mire', x: 0.78, y: 0.42,
      description: 'Chemical plant in the Mire. Produces chemicals needed for the Scorched vaccine.' },
    { id: 42, name: 'Tanagra Town', category: 'mire', x: 0.85, y: 0.45,
      description: 'Town overrun by strangler vines. The plants have lifted buildings into the air.' },
    { id: 43, name: 'Treehouse Village', category: 'mire', x: 0.75, y: 0.48,
      description: 'Survivors built homes in the trees to escape the Mire\'s dangers.' },
    { id: 44, name: 'Camp Venture', category: 'mire', x: 0.88, y: 0.52,
      description: 'Brotherhood of Steel forward camp. They came to fight the Scorched and failed.' },
    { id: 45, name: 'Abbie\'s Bunker', category: 'mire', x: 0.80, y: 0.40,
      description: 'Free States bunker with crucial information about fighting the Scorched.' },

    // === CRANBERRY BOG ===
    { id: 50, name: 'Watoga', category: 'bog', x: 0.78, y: 0.72,
      description: 'The "City of the Future" - fully automated. Robots went haywire. High-level area with great loot.' },
    { id: 51, name: 'Fissure Site Prime', category: 'bog', x: 0.72, y: 0.78,
      description: 'The largest fissure - source of the Scorchbeasts. Drop a nuke here to summon the Scorchbeast Queen.' },
    { id: 52, name: 'Fort Defiance', category: 'bog', x: 0.82, y: 0.65,
      description: 'Brotherhood of Steel headquarters in Appalachia. Their last stand against the Scorched.' },
    { id: 53, name: 'Glassed Cavern', category: 'bog', x: 0.68, y: 0.82,
      description: 'Site of a nuclear detonation. The Scorched emerged from deep underground here.' },
    { id: 54, name: 'Drop Site V9', category: 'bog', x: 0.75, y: 0.75,
      description: 'Supply drop location in the Bog. High-level enemies patrol.' },
    { id: 55, name: 'Site Charlie', category: 'bog', x: 0.85, y: 0.70,
      description: 'Another nuclear missile silo. Requires code pieces to launch.' },

    // === VAULTS ===
    { id: 60, name: 'Vault 63', category: 'vaults', x: 0.32, y: 0.68,
      description: 'Sealed vault in the Ash Heap. Part of the Skyline Valley expansion. Contains dark secrets.' },
    { id: 61, name: 'Vault 79', category: 'vaults', x: 0.55, y: 0.18,
      description: 'Gold repository vault. Central to the Wastelanders storyline. Raiders and Settlers both want it.' },
    { id: 62, name: 'Vault 94', category: 'vaults', x: 0.82, y: 0.48,
      description: 'G.E.C.K. experiment vault. Strangler vines originated here. High-level raid content.' },
    { id: 63, name: 'Vault 96', category: 'vaults', x: 0.65, y: 0.85,
      description: 'Cryogenic preservation vault. Contains frozen creatures.' },
    { id: 64, name: 'Vault 51', category: 'vaults', x: 0.42, y: 0.25,
      description: 'Social experiment vault. Nuclear Winter battle royale took place here.' },

    // === WORKSHOPS (Claimable) ===
    { id: 70, name: 'Sunshine Meadows Industrial Farm', category: 'workshop', x: 0.30, y: 0.40,
      description: 'Food production workshop. Claim it to produce packaged foods.' },
    { id: 71, name: 'Charleston Landfill', category: 'workshop', x: 0.35, y: 0.52,
      description: 'Junk collection workshop. Good for materials gathering.' },
    { id: 72, name: 'Grafton Steel', category: 'workshop', x: 0.42, y: 0.20,
      description: 'Steel production workshop. Claim for steel and other metals.' },
    { id: 73, name: 'Hemlock Holes Maintenance', category: 'workshop', x: 0.48, y: 0.08,
      description: 'Golf course workshop. Has acid resource node.' },
    { id: 74, name: 'Converted Munitions Factory', category: 'workshop', x: 0.68, y: 0.28,
      description: 'Ammunition production. Produces ammo automatically.' },
    { id: 75, name: 'Monongah Power Plant', category: 'workshop', x: 0.52, y: 0.25,
      description: 'Power production workshop. Provides fusion cores.' },
    { id: 76, name: 'Poseidon Energy Plant', category: 'workshop', x: 0.30, y: 0.62,
      description: 'Large power workshop. Multiple resource extractors possible.' },
    { id: 77, name: 'Thunder Mountain Power Plant', category: 'workshop', x: 0.78, y: 0.55,
      description: 'Power plant in the Mire. Dangerous area but valuable.' },
    { id: 78, name: 'Wade Airport', category: 'workshop', x: 0.58, y: 0.45,
      description: 'Airport workshop. Decent central location.' },

    // === NOTABLE LOCATIONS ===
    { id: 80, name: 'Arktos Pharma', category: 'forest', x: 0.42, y: 0.38,
      description: 'Pharmaceutical company. Project Paradise event location. Mutated animals inside.' },
    { id: 81, name: 'New Gad', category: 'savage', x: 0.60, y: 0.42,
      description: 'Settlement founded by survivors. Wastelanders content.' },
    { id: 82, name: 'Foundation', category: 'savage', x: 0.55, y: 0.48,
      description: 'Settler faction headquarters. Paige leads the peaceful settlers.' },
    { id: 83, name: 'Crater', category: 'toxic', x: 0.48, y: 0.12,
      description: 'Raider faction headquarters. Meg leads the raiders. Built in a crashed space station.' },
    { id: 84, name: 'Fort Atlas', category: 'savage', x: 0.58, y: 0.50,
      description: 'Brotherhood of Steel new headquarters. Paladin Rahmani and Knight Shin lead.' },
    { id: 85, name: 'The Rusty Pick', category: 'ash', x: 0.25, y: 0.75,
      description: 'Mole miner trading post. Purveyor Murmrgh sells legendary items for scrip.' }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CATEGORIES, locations };
}
