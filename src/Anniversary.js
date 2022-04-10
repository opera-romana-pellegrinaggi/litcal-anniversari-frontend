class Anniversary {
    // static Trimillennial    = new Anniversary(3000, "trimillennial", "trimillennial", false)
    // static Bimillennial     = new Anniversary(2000, "bimillennial", "bimillennial", false)
    // static Sesquimillenial  = new Anniversary(1500, "sesquimillenial", "sesquimillenial", false)
    // static Millennial   = new Anniversary(1000, "millennial",   "millennial",           true)
    // static Nonacentennial   = new Anniversary(900, "nonacentennial", "nonacentennial", false)
    // static Octocentennial   = new Anniversary(800, "octocentennial", "octocentennial", false)
    // static Septuacentennial = new Anniversary(700, "septuacentennial", "septuacentennial", false)
    // static Sexacentennial   = new Anniversary(600, "sexacentennial", "sexacentennial", false)
    // static Quincentennial   = new Anniversary(500, "quincentennial", "quincentennial", false)
    // static Quadricentennial = new Anniversary(400, "quadricentennial", "quadricentennial", false)
    // static Tricentennial    = new Anniversary(300, "tricentennial", "tricentennial", false)
    // static Semiquincentennial = new Anniversary(250, "semiquincentennial", "semiquincentennial", false)
    // static Bicentennial     = new Anniversary(200, "bicentennial", "bicentennial", false)
    // static Septaquintaquinquecentennial = new Anniversary(175, "septaquintaquinquecentennial", "septaquintaquinquecentennial", false)
    // static Sesquincentennial    = new Anniversary(150, "sesquicentennial", "sesquicentennial", false)
    // static Quasquicentennial    = new Anniversary(125, "quasquicentennial", "quasquicentennial", false)
    static Centenary    = new Anniversary(100,  "centenary",    "centennial",           true)
    static Onyx         = new Anniversary(95,   "onyx",         "quinnonagintennial",   false)  //Onice
    static Granite      = new Anniversary(90,   "granite",      "nonagintennial",       true)   //Granito
    static Marble       = new Anniversary(85,   "marble",       "quinoctogintennial",   false)  //Marmo
    static Oak          = new Anniversary(80,   "oak",          "octogintennial",       true)   //Quercia
    static Platinum     = new Anniversary(75,   "platinum",     "demisesquicentennial", true)   //Platino
    static Iron         = new Anniversary(70,   "iron",         "septuagennial",        true)   //Ferro
    static Stone        = new Anniversary(65,   "stone",        "quinsexagennial",      false)  //Pietra
    static Diamond      = new Anniversary(60,   "diamond",      "sexagennial",          true)   //Diamante
    static Emerald      = new Anniversary(55,   "emerald",      "quinquinquagennial",   false)  //Smeraldo
    static Gold         = new Anniversary(50,   "gold",         "semicentennial",       true)   //Oro
    static Sapphire     = new Anniversary(45,   "sapphire",     "quinquadragennial",    false)  //Zaffiro
    static Ruby         = new Anniversary(40,   "ruby",         "quadragennial",        true)   //Rubino
    static Coral        = new Anniversary(35,   "coral",        "quintricennial",       false)  //Coralllo
    static Pearl        = new Anniversary(30,   "pearl",        "tricennial",           true)   //Perla
    static Silver       = new Anniversary(25,   "silver",       "quadranscentennial",   true)   //Argento
    static Porcelain    = new Anniversary(20,   "porcelain",    "vigintennial",         true)   //Porcellana
    static Crystal      = new Anniversary(15,   "crystal",      "quindecennial",        false)  //Cristallo
    static Aluminum     = new Anniversary(10,   "aluminum",     "decennial",            true)   //Stagno
    static Wood         = new Anniversary(5,    "wood",         "quinquennial",         false)  //Legno
    static Paper        = new Anniversary(1,    "paper",        "annual",               false)  //Carta

    constructor(year, name, latinTerm, recurring) {
        this.name = name
        this.year = year
        this.latinTerm = latinTerm
        this.recurring = recurring
    }
}

export default Anniversary;
