export const TEAMS = [
  // Group A
  { code: 'MEX', name: 'Mexico',        flag: '🇲🇽', group: 'A' },
  { code: 'RSA', name: 'South Africa',  flag: '🇿🇦', group: 'A' },
  { code: 'KOR', name: 'South Korea',   flag: '🇰🇷', group: 'A' },
  { code: 'CZE', name: 'Czech Republic',flag: '🇨🇿', group: 'A' },
  // Group B
  { code: 'CAN', name: 'Canada',        flag: '🇨🇦', group: 'B' },
  { code: 'BIH', name: 'Bosnia',        flag: '🇧🇦', group: 'B' },
  { code: 'QAT', name: 'Qatar',         flag: '🇶🇦', group: 'B' },
  { code: 'SUI', name: 'Switzerland',   flag: '🇨🇭', group: 'B' },
  // Group C
  { code: 'BRA', name: 'Brazil',        flag: '🇧🇷', group: 'C' },
  { code: 'MAR', name: 'Morocco',       flag: '🇲🇦', group: 'C' },
  { code: 'HAI', name: 'Haiti',         flag: '🇭🇹', group: 'C' },
  { code: 'SCO', name: 'Scotland',      flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'C' },
  // Group D
  { code: 'USA', name: 'United States', flag: '🇺🇸', group: 'D' },
  { code: 'PAR', name: 'Paraguay',      flag: '🇵🇾', group: 'D' },
  { code: 'AUS', name: 'Australia',     flag: '🇦🇺', group: 'D' },
  { code: 'TUR', name: 'Turkey',        flag: '🇹🇷', group: 'D' },
  // Group E
  { code: 'GER', name: 'Germany',       flag: '🇩🇪', group: 'E' },
  { code: 'CUW', name: 'Curaçao',       flag: '🇨🇼', group: 'E' },
  { code: 'CIV', name: "Côte d'Ivoire", flag: '🇨🇮', group: 'E' },
  { code: 'ECU', name: 'Ecuador',       flag: '🇪🇨', group: 'E' },
  // Group F
  { code: 'NED', name: 'Netherlands',   flag: '🇳🇱', group: 'F' },
  { code: 'JPN', name: 'Japan',         flag: '🇯🇵', group: 'F' },
  { code: 'SWE', name: 'Sweden',        flag: '🇸🇪', group: 'F' },
  { code: 'TUN', name: 'Tunisia',       flag: '🇹🇳', group: 'F' },
  // Group G
  { code: 'BEL', name: 'Belgium',       flag: '🇧🇪', group: 'G' },
  { code: 'EGY', name: 'Egypt',         flag: '🇪🇬', group: 'G' },
  { code: 'IRN', name: 'Iran',          flag: '🇮🇷', group: 'G' },
  { code: 'NZL', name: 'New Zealand',   flag: '🇳🇿', group: 'G' },
  // Group H
  { code: 'ESP', name: 'Spain',         flag: '🇪🇸', group: 'H' },
  { code: 'CPV', name: 'Cape Verde',    flag: '🇨🇻', group: 'H' },
  { code: 'KSA', name: 'Saudi Arabia',  flag: '🇸🇦', group: 'H' },
  { code: 'URU', name: 'Uruguay',       flag: '🇺🇾', group: 'H' },
  // Group I
  { code: 'FRA', name: 'France',        flag: '🇫🇷', group: 'I' },
  { code: 'SEN', name: 'Senegal',       flag: '🇸🇳', group: 'I' },
  { code: 'IRQ', name: 'Iraq',          flag: '🇮🇶', group: 'I' },
  { code: 'NOR', name: 'Norway',        flag: '🇳🇴', group: 'I' },
  // Group J
  { code: 'ARG', name: 'Argentina',     flag: '🇦🇷', group: 'J' },
  { code: 'ALG', name: 'Algeria',       flag: '🇩🇿', group: 'J' },
  { code: 'AUT', name: 'Austria',       flag: '🇦🇹', group: 'J' },
  { code: 'JOR', name: 'Jordan',        flag: '🇯🇴', group: 'J' },
  // Group K
  { code: 'POR', name: 'Portugal',      flag: '🇵🇹', group: 'K' },
  { code: 'COD', name: 'DR Congo',      flag: '🇨🇩', group: 'K' },
  { code: 'UZB', name: 'Uzbekistan',    flag: '🇺🇿', group: 'K' },
  { code: 'COL', name: 'Colombia',      flag: '🇨🇴', group: 'K' },
  // Group L
  { code: 'ENG', name: 'England',       flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'L' },
  { code: 'CRO', name: 'Croatia',       flag: '🇭🇷', group: 'L' },
  { code: 'GHA', name: 'Ghana',         flag: '🇬🇭', group: 'L' },
  { code: 'PAN', name: 'Panama',        flag: '🇵🇦', group: 'L' },
]

// Player names per team — 18 players per team
// Index 0-10 → sticker positions 2-12 ; index 11-17 → sticker positions 14-20
const PLAYERS_BY_TEAM = {
  ALG: [
    'Alexis Guendouz', 'Ramy Bensebaini', 'Youcef Atal', 'Rayan Aït-Nouri',
    'Mohamed Amine Tougai', 'Aïssa Mandi', 'Ismael Bennacer', 'Houssem Aouar',
    'Hicham Boudaoui', 'Ramiz Zerrouki', 'Nabil Bentaleb',
    'Farés Chaibi', 'Riyad Mahrez', 'Saïd Benrahma', 'Anis Hadj Moussa',
    'Amine Gouiri', 'Baghdad Bounedjah', 'Mohamed Amoura',
  ],
  ARG: [
    'Emiliano Martínez', 'Nahuel Molina', 'Cristian Romero', 'Nicolás Otamendi',
    'Nicolás Tagliafico', 'Leonardo Balerdi', 'Enzo Fernández', 'Alexis Mac Allister',
    'Rodrigo De Paul', 'Exequiel Palacios', 'Leandro Paredes',
    'Nico Paz', 'Franco Mastantuono', 'Nico González', 'Lionel Messi',
    'Lautaro Martínez', 'Julián Álvarez', 'Giuliano Simeone',
  ],
  AUS: [
    'Mathew Ryan', 'Joe Gauci', 'Harry Souttar', 'Alessandro Circati',
    'Jordan Bos', 'Aziz Behich', 'Cameron Burgess', 'Lewis Miller',
    'Milos Degenek', 'Jackson Irvine', 'Riley McGree',
    "Aiden O'Neill", 'Connor Metcalfe', 'Patrick Yazbek', 'Craig Goodwin',
    'Kusini Yengi', 'Nestory Irankunda', 'Mohamed Touré',
  ],
  AUT: [
    'Alexander Schlager', 'Patrick Pentz', 'David Alaba', 'Kevin Danso',
    'Philipp Lienhart', 'Stefan Posch', 'Phillipp Mwene', 'Alexander Prass',
    'Xaver Schlager', 'Marcel Sabitzer', 'Konrad Laimer',
    'Florian Grillitsch', 'Nicolas Seiwald', 'Romano Schmid', 'Patrick Wimmer',
    'Christoph Baumgartner', 'Michael Gregoritsch', 'Marko Arnautović',
  ],
  BEL: [
    'Thibaut Courtois', 'Arthur Theate', 'Timothy Castagne', 'Zeno Debast',
    'Brandon Mechele', 'Maxim De Cuyper', 'Thomas Meunier', 'Youri Tielemans',
    'Amadou Onana', 'Nicolas Raskin', 'Alexis Saelemaekers',
    'Hans Vanaken', 'Kevin De Bruyne', 'Jérémy Doku', 'Charles De Ketelaere',
    'Leandro Trossard', 'Loïs Openda', 'Romelu Lukaku',
  ],
  BIH: [
    'Nikola Vasilj', 'Amer Dedić', 'Sead Kolašinac', 'Tarik Muharemović',
    'Nihad Mujakić', 'Nikola Katić', 'Amir Hadžiahmetović', 'Benjamin Tahirović',
    'Armin Gigović', 'Ivan Šunjić', 'Ivan Bašić',
    'Dženis Burnić', 'Esmir Bajraktarević', 'Amar Memić', 'Ermedin Demirović',
    'Edin Džeko', 'Samed Baždar', 'Haris Tabaković',
  ],
  BRA: [
    'Alisson', 'Bento', 'Marquinhos', 'Éder Militão',
    'Gabriel Magalhães', 'Danilo', 'Wesley', 'Lucas Paquetá',
    'Casemiro', 'Bruno Guimarães', 'Luiz Henrique',
    'Vinícius Júnior', 'Rodrygo', 'João Pedro', 'Matheus Cunha',
    'Gabriel Martinelli', 'Raphinha', 'Estêvão',
  ],
  CAN: [
    'Dayne St. Clair', 'Alphonso Davies', 'Alistair Johnston', 'Samuel Adekugbe',
    'Richie Laryea', 'Derek Cornelius', 'Moïse Bombito', 'Kamal Miller',
    'Stephen Eustáquio', 'Ismaël Koné', 'Jonathan Osorio',
    'Jacob Shaffelburg', 'Mathieu Choinière', 'Niko Sigur', 'Tajon Buchanan',
    'Liam Millar', 'Cyle Larin', 'Jonathan David',
  ],
  CIV: [
    'Yahia Fofana', 'Ghislain Konan', 'Wilfried Singo', 'Odilon Kossounou',
    'Evan Ndicka', 'Willy Boly', 'Emmanuel Agbadou', 'Ousmane Diomandé',
    'Franck Kessié', 'Seko Fofana', 'Ibrahim Sangaré',
    'Jean-Philippe Gbamin', 'Amad Diallo', 'Sébastien Haller', 'Simon Adingra',
    'Yan Diomandé', 'Evann Guessand', 'Oumar Diakité',
  ],
  COD: [
    'Lionel Mpasi', 'Aaron Wan-Bissaka', 'Axel Tuanzebe', 'Arthur Masuaku',
    'Chancel Mbemba', 'Joris Kayembe', 'Charles Pickel', "Ngal'ayel Mukau",
    'Edo Kayembe', 'Samuel Moutoussamy', 'Noah Sadiki',
    'Théo Bongonda', 'Meschak Elia', 'Yoane Wissa', 'Brian Cipenga',
    'Fiston Mayele', 'Cédric Bakambu', 'Nathanaël Mbuku',
  ],
  COL: [
    'Camilo Vargas', 'David Ospina', 'Dávinson Sánchez', 'Yerry Mina',
    'Daniel Muñoz', 'Johan Mojica', 'Jhon Lucumí', 'Santiago Arias',
    'Jefferson Lerma', 'Kevin Castaño', 'Richard Ríos',
    'James Rodríguez', 'Juan Fernando Quintero', 'Jorge Carrascal', 'Jhon Arias',
    'Jhon Córdoba', 'Luis Suárez', 'Luis Díaz',
  ],
  CPV: [
    'Vozinha', 'Logan Costa', 'Pico', 'Diney',
    'Steven Moreira', 'Wagner Pina', 'João Paulo', 'Yannick Semedo',
    'Kevin Pina', 'Patrick Andrade', 'Jamiro Monteiro',
    'Deroy Duarte', 'Garry Rodrigues', 'Jovane Cabral', 'Ryan Mendes',
    'Dailon Livramento', 'Willy Semedo', 'Bebé',
  ],
  CRO: [
    'Dominik Livaković', 'Duje Ćaleta-Car', 'Joško Gvardiol', 'Josip Stanišić',
    'Luka Vušković', 'Josip Šutalo', 'Kristijan Jakić', 'Luka Modrić',
    'Mateo Kovačić', 'Martin Baturina', 'Lovro Majer',
    'Mario Pašalić', 'Petar Sučić', 'Ivan Perišić', 'Marco Pašalić',
    'Ante Budimir', 'Andrej Kramarić', 'Franjo Ivanović',
  ],
  CUW: [
    'Eloy Room', 'Armando Obispo', 'Sherel Floranus', 'Jurien Gaari',
    'Joshua Brenet', 'Roshon van Eijma', 'Shurandy Sambo', 'Livano Comenencia',
    'Godfried Roemeratoe', 'Juninho Bacuna', 'Leandro Bacuna',
    'Tahith Chong', 'Kenji Gorré', 'Jearl Margaritha', 'Jürgen Locadia',
    'Jeremy Antonisse', 'Gervane Kastaneer', 'Sontje Hansen',
  ],
  CZE: [
    'Matěj Kovář', 'Jindřich Staněk', 'Ladislav Krejčí', 'Vladimír Coufal',
    'Jaroslav Zelený', 'Tomáš Holeš', 'David Zima', 'Michal Sadílek',
    'Lukáš Provod', 'Lukáš Červ', 'Tomáš Souček',
    'Pavel Šulc', 'Matěj Vydra', 'Vasil Kušej', 'Tomáš Chorý',
    'Václav Černý', 'Adam Hložek', 'Patrik Schick',
  ],
  ECU: [
    'Hernán Galíndez', 'Gonzalo Valle', 'Piero Hincapié', 'Pervis Estupiñán',
    'Willian Pacho', 'Ángelo Preciado', 'Joel Ordóñez', 'Moisés Caicedo',
    'Alan Franco', 'Kendry Páez', 'Pedro Vite',
    'John Yeboah', 'Leonardo Campana', 'Gonzalo Plata', 'Nilson Angulo',
    'Alan Minda', 'Kevin Rodríguez', 'Enner Valencia',
  ],
  EGY: [
    'Mohamed El Shenawy', 'Mohamed Hany', 'Mohamed Hamdy', 'Yasser Ibrahim',
    'Khaled Sobhy', 'Ramy Rabia', 'Hossam Abdelmaguid', 'Ahmed Fatouh',
    'Marwan Attia', 'Zizo', 'Hamdy Fathy',
    'Mohamed Lasheen', 'Emam Ashour', 'Osama Faisal', 'Mohamed Salah',
    'Mostafa Mohamed', 'Trézéguet', 'Omar Marmoush',
  ],
  ENG: [
    'Jordan Pickford', 'John Stones', 'Marc Guéhi', 'Ezri Konsa',
    'Trent Alexander-Arnold', 'Reece James', 'Dan Burn', 'Jordan Henderson',
    'Declan Rice', 'Jude Bellingham', 'Cole Palmer',
    'Morgan Rogers', 'Anthony Gordon', 'Phil Foden', 'Bukayo Saka',
    'Harry Kane', 'Marcus Rashford', 'Ollie Watkins',
  ],
  ESP: [
    'Unai Simón', 'Robin Le Normand', 'Aymeric Laporte', 'Dean Huijsen',
    'Pedro Porro', 'Dani Carvajal', 'Marc Cucurella', 'Martín Zubimendi',
    'Rodri', 'Pedri', 'Fabián Ruiz',
    'Mikel Merino', 'Lamine Yamal', 'Dani Olmo', 'Nico Williams',
    'Ferran Torres', 'Álvaro Morata', 'Mikel Oyarzabal',
  ],
  FRA: [
    'Mike Maignan', 'Theo Hernández', 'William Saliba', 'Jules Koundé',
    'Ibrahima Konaté', 'Dayot Upamecano', 'Lucas Digne', 'Aurélien Tchouaméni',
    'Eduardo Camavinga', 'Manu Koné', 'Adrien Rabiot',
    'Michael Olise', 'Ousmane Dembélé', 'Bradley Barcola', 'Désiré Doué',
    'Kingsley Coman', 'Hugo Ekitiké', 'Kylian Mbappé',
  ],
  GER: [
    'Marc-André ter Stegen', 'Jonathan Tah', 'David Raum', 'Nico Schlotterbeck',
    'Antonio Rüdiger', 'Waldemar Anton', 'Ridle Baku', 'Maximilian Mittelstädt',
    'Joshua Kimmich', 'Florian Wirtz', 'Felix Nmecha',
    'Leon Goretzka', 'Jamal Musiala', 'Serge Gnabry', 'Kai Havertz',
    'Leroy Sané', 'Karim Adeyemi', 'Nick Woltemade',
  ],
  GHA: [
    'Lawrence Ati-Zigi', 'Tariq Lamptey', 'Mohammed Salisu', 'Alidu Seidu',
    'Alexander Djiku', 'Gideon Mensah', 'Caleb Yirenkyi', 'Abdul Fatawu Issahaku',
    'Thomas Partey', 'Salis Abdul Samed', 'Kamaldeen Sulemana',
    'Mohammed Kudus', 'Iñaki Williams', 'Jordan Ayew', 'André Ayew',
    'Joseph Paintsil', 'Osman Bukari', 'Antoine Semenyo',
  ],
  HAI: [
    'Johny Placide', 'Carlens Arcus', 'Martin Experience', 'Jean-Kevin Duverne',
    'Ricardo Adé', 'Duke Lacroix', 'Garven Metusala', 'Hannes Delcroix',
    'Leverton Pierre', 'Danley Jean Jacques', 'Jean-Ricner Bellegarde',
    'Christopher Attys', 'Derrick Etienne Jr.', 'Josué Casimir', 'Ruben Providence',
    'Duckens Nazon', 'Louicius Deedson', 'Frantzdy Pierrot',
  ],
  IRN: [
    'Alireza Beiranvand', 'Morteza Pouraliganji', 'Ehsan Hajsafi', 'Milad Mohammadi',
    'Shojae Khalilzadeh', 'Ramin Rezaeian', 'Hossein Kanaani', 'Sadegh Moharrami',
    'Saleh Hardani', 'Saeed Ezatolahi', 'Saman Ghoddos',
    'Omid Noorafkan', 'Roozbeh Cheshmi', 'Mohammad Mohebbi', 'Sardar Azmoun',
    'Mehdi Taremi', 'Alireza Jahanbakhsh', 'Ali Gholizadeh',
  ],
  IRQ: [
    'Jalal Hassan', 'Rebin Sulaka', 'Hussein Ali', 'Akam Hashem',
    'Merchas Doski', 'Zaid Tahseen', 'Manaf Younis', 'Zidane Iqbal',
    'Amir Al-Ammari', 'Ibrahim Bayesh', 'Ali Jasim',
    'Youssef Amyn', 'Aymen Hussein', 'Marko Frej', 'Osama Rashid',
    'Ali Al-Hamadi', 'Aymen Hussein', 'Mohanad Ali',
  ],
  JOR: [
    'Yazeed Abulaila', 'Ihsan Haddad', 'Mohammad Abu Hashish', 'Yazan Al-Arab',
    'Abdallah Nasib', 'Saleem Obaid', 'Mohammad Abualnadi', 'Ibrahim Saadeh',
    'Nizar Al-Rashdan', 'Noor Al-Rawabdeh', 'Mohannad Abu Taha',
    'Amer Jamous', 'Mousa Al-Taamari', 'Yazan Al-Naimat', 'Mahmoud Al-Mardi',
    'Ali Olwan', 'Mohammad Abu Zrayq', 'Ibrahim Sabra',
  ],
  JPN: [
    'Zion Suzuki', 'Henry Hiroki Mochizuki', 'Ayumu Seko', 'Junnosuke Suzuki',
    'Shogo Taniguchi', 'Tsuyoshi Watanabe', 'Kaishu Sano', 'Yuki Soma',
    'Ao Tanaka', 'Daichi Kamada', 'Takefusa Kubo',
    'Ritsu Doan', 'Keito Nakamura', 'Takumi Minamino', 'Shuto Machino',
    'Junya Ito', 'Koki Ogawa', 'Ayase Ueda',
  ],
  KOR: [
    'Jo Hyeon-woo', 'Kim Seung-gyu', 'Kim Min-jae', 'Cho Yu-min',
    'Seol Young-woo', 'Lee Han-beom', 'Lee Tae-seok', 'Lee Myung-jae',
    'Lee Jae-sung', 'Hwang In-beom', 'Lee Kang-in',
    'Paik Seung-ho', 'Jens Castrop', 'Lee Dong-gyeong', 'Cho Gue-sung',
    'Son Heung-min', 'Hwang Hee-chan', 'Oh Hyeon-gyu',
  ],
  KSA: [
    'Nawaf Al-Aqidi', 'Abdulrahman Al-Sanbi', 'Saud Abdulhamid', 'Nawaf Boushal',
    'Jihad Thakri', 'Moteb Al-Harbi', 'Hassan Al-Tambakti', 'Musab Al-Juwayr',
    'Ziyad Al-Johani', 'Abdullah Al-Khaibari', 'Nasser Al-Dawsari',
    'Saleh Abu Al-Shamat', 'Marwan Al-Sahafi', 'Salem Al-Dawsari', 'Abdulrahman Al-Aboud',
    'Feras Al-Brikan', 'Saleh Al-Shehri', 'Abdullah Al-Hamdan',
  ],
  MAR: [
    'Yassine Bounou', 'Munir El Kajoui', 'Achraf Hakimi', 'Noussair Mazraoui',
    'Nayef Aguerd', 'Romain Saïss', 'Jawad El Yamiq', 'Adam Masina',
    'Sofyan Amrabat', 'Azzedine Ounahi', 'Eliesse Ben Seghir',
    'Bilal El Khannouss', 'Ismael Saibari', 'Youssef En-Nesyri', 'Abde Ezzalzouli',
    'Soufiane Rahimi', 'Brahim Díaz', 'Ayoub El Kaabi',
  ],
  MEX: [
    'Luis Malagón', 'Johan Vásquez', 'Jorge Sánchez', 'César Montes',
    'Jesús Gallardo', 'Israel Reyes', 'Diego Lainez', 'Carlos Rodríguez',
    'Edson Álvarez', 'Orbelín Pineda', 'Marcel Ruiz',
    'Érick Sánchez', 'Hirving Lozano', 'Santiago Giménez', 'Raúl Jiménez',
    'Alexis Vega', 'Roberto Alvarado', 'César Huerta',
  ],
  NED: [
    'Bart Verbruggen', 'Virgil van Dijk', 'Micky van de Ven', 'Jurriën Timber',
    'Denzel Dumfries', 'Nathan Aké', 'Jeremie Frimpong', 'Jan Paul van Hecke',
    'Tijjani Reijnders', 'Ryan Gravenberch', 'Teun Koopmeiners',
    'Frenkie de Jong', 'Xavi Simons', 'Justin Kluivert', 'Memphis Depay',
    'Donyell Malen', 'Wout Weghorst', 'Cody Gakpo',
  ],
  NOR: [
    'Ørjan Nyland', 'Julian Ryerson', 'Leo Østigård', 'Kristoffer Vassbakk Ajer',
    'Marcus Holmgren Pedersen', 'David Møller Wolfe', 'Torbjørn Heggem', 'Morten Thorsby',
    'Martin Ødegaard', 'Sander Berge', 'Andreas Schjelderup',
    'Patrick Berg', 'Erling Haaland', 'Alexander Sørloth', 'Aron Dønnum',
    'Jørgen Strand Larsen', 'Antonio Nusa', 'Oscar Bobb',
  ],
  NZL: [
    'Max Crocombe', 'Alex Paulsen', 'Michael Boxall', 'Liberato Cacace',
    'Tim Payne', 'Tyler Bindon', 'Francis de Vries', 'Finn Surman',
    'Joe Bell', 'Sarpreet Singh', 'Ryan Thomas',
    'Matthew Garbett', 'Marko Stamenic', 'Ben Old', 'Chris Wood',
    'Elijah Just', 'Callum McCowatt', 'Kosta Barbarouses',
  ],
  PAN: [
    'Orlando Mosquera', 'Luis Mejía', 'Fidel Escobar', 'Andrés Andrade',
    'Michael Amir Murillo', 'Eric Davis', 'José Córdoba', 'César Blackman',
    'Cristian Martínez', 'Aníbal Godoy', 'Adalberto Carrasquilla',
    'Édgar Bárcenas', 'Carlos Harvey', 'Ismael Díaz', 'José Fajardo',
    'Cecilio Waterman', 'José Luis Rodríguez', 'Alberto Quintero',
  ],
  PAR: [
    'Roberto Fernández', 'Orlando Gill', 'Gustavo Gómez', 'Fabián Balbuena',
    'Juan José Cáceres', 'Omar Alderete', 'Junior Alonso', 'Mathías Villasanti',
    'Diego Gómez', 'Damián Bobadilla', 'Andrés Cubas',
    'Matías Galarza Fonda', 'Julio Enciso', 'Alejandro Romero Gamarra', 'Miguel Almirón',
    'Ramón Sosa', 'Ángel Romero', 'Antonio Sanabria',
  ],
  POR: [
    'Diogo Costa', 'José Sá', 'Rúben Dias', 'João Cancelo',
    'Diogo Dalot', 'Nuno Mendes', 'Gonçalo Inácio', 'Bernardo Silva',
    'Bruno Fernandes', 'Rúben Neves', 'Vitinha',
    'João Neves', 'Cristiano Ronaldo', 'Francisco Trincão', 'João Félix',
    'Gonçalo Ramos', 'Pedro Neto', 'Rafael Leão',
  ],
  QAT: [
    'Meshaal Barsham', 'Sultan Al-Brake', 'Lucas Mendes', 'Homam Ahmed',
    'Boualem Khoukhi', 'Pedro Miguel', 'Tarek Salman', 'Mohammed Al-Mannai',
    'Karim Boudiaf', 'Assim Madibo', 'Ahmed Fatehi',
    'Mohammed Waad', 'Abdulaziz Hatem', 'Hassan Al-Haydos', 'Edmilson Junior',
    'Akram Afif', 'Ahmed Al-Ganehi', 'Almoez Ali',
  ],
  RSA: [
    'Ronwen Williams', 'Sipho Chaine', 'Aubrey Modiba', 'Samukele Kabini',
    'Mbekezeli Mbokazi', 'Khulumani Ndamane', 'Siyabonga Ngezana', 'Khuliso Mudau',
    'Nkosinathi Sibisi', 'Teboho Mokoena', 'Thalente Mbatha',
    'Bathusi Aubaas', 'Yanga Sithole', 'Sipho Mbule', 'Lyle Foster',
    'Iqraam Rayners', 'Mohau Nkota', 'Oswin Appollis',
  ],
  SCO: [
    'Angus Gunn', 'Jack Hendry', 'Kieran Tierney', 'Aaron Hickey',
    'Andrew Robertson', 'Scott McKenna', 'John Souttar', 'Anthony Ralston',
    'Grant Hanley', 'Scott McTominay', 'Billy Gilmour',
    'Lewis Ferguson', 'Ryan Christie', 'Kenny McLean', 'John McGinn',
    'Lyndon Dykes', 'Che Adams', 'Ben Doak',
  ],
  SEN: [
    'Édouard Mendy', 'Yehvann Diouf', 'Moussa Niakhaté', 'Abdoulaye Seck',
    'Ismail Jakobs', 'El Hadji Malick Diouf', 'Kalidou Koulibaly', 'Idrissa Gana Gueye',
    'Pape Matar Sarr', 'Pape Gueye', 'Habib Diarra',
    'Lamine Camara', 'Sadio Mané', 'Ismaïla Sarr', 'Boulaye Dia',
    'Iliman Ndiaye', 'Nicolas Jackson', 'Krépin Diatta',
  ],
  SUI: [
    'Gregor Kobel', 'Yvon Mvogo', 'Manuel Akanji', 'Ricardo Rodríguez',
    'Nico Elvedi', 'Aurèle Amenda', 'Silvan Widmer', 'Granit Xhaka',
    'Denis Zakaria', 'Remo Freuler', 'Fabian Rieder',
    'Ardon Jashari', 'Johan Manzambi', 'Michel Aebischer', 'Breel Embolo',
    'Rubén Vargas', 'Dan Ndoye', 'Zeki Amdouni',
  ],
  SWE: [
    'Viktor Johansson', 'Isak Hien', 'Gabriel Gudmundsson', 'Emil Holm',
    'Victor Nilsson Lindelöf', 'Gustaf Lagerbielke', 'Lucas Bergvall', 'Hugo Larsson',
    'Jesper Karlström', 'Yasin Ayari', 'Mattias Svanberg',
    'Daniel Svensson', 'Ken Sema', 'Roony Bardghji', 'Dejan Kulusevski',
    'Anthony Elanga', 'Alexander Isak', 'Viktor Gyökeres',
  ],
  TUN: [
    'Bechir Ben Said', 'Aymen Dahmen', 'Yann Valery', 'Montassar Talbi',
    'Yassine Meriah', 'Ali Abdi', 'Dylan Bronn', 'Ellyes Skhiri',
    'Aïssa Laïdouni', 'Ferjani Sassi', 'Mohamed Ali Ben Romdhane',
    'Hannibal Mejbri', 'Elias Achouri', 'Elias Saad', 'Hazem Mastouri',
    'Ismaël Gharbi', 'Sayfallah Ltaief', 'Naïm Sliti',
  ],
  TUR: [
    'Uğurcan Çakır', 'Mert Müldür', 'Zeki Çelik', 'Abdülkerim Bardakcı',
    'Çağlar Söyüncü', 'Merih Demiral', 'Ferdi Kadıoğlu', 'Kaan Ayhan',
    'İsmail Yüksek', 'Hakan Çalhanoğlu', 'Orkun Kökçü',
    'Arda Güler', 'İrfan Can Kahveci', 'Yunus Akgün', 'Can Uzun',
    'Barış Alper Yılmaz', 'Kerem Aktürkoğlu', 'Kenan Yıldız',
  ],
  URU: [
    'Sergio Rochet', 'Santiago Mele', 'Ronald Araújo', 'José María Giménez',
    'Sebastián Cáceres', 'Mathías Olivera', 'Guillermo Varela', 'Nahitan Nández',
    'Federico Valverde', 'Giorgian de Arrascaeta', 'Rodrigo Bentancur',
    'Manuel Ugarte', 'Nicolás de la Cruz', 'Maxi Araújo', 'Darwin Núñez',
    'Federico Viñas', 'Rodrigo Aguirre', 'Facundo Pellistri',
  ],
  USA: [
    'Matt Freese', 'Chris Richards', 'Tim Ream', 'Mark McKenzie',
    'Alex Freeman', 'Antonee Robinson', 'Tyler Adams', 'Tanner Tessmann',
    'Weston McKennie', 'Cristian Roldan', 'Timothy Weah',
    'Diego Luna', 'Malik Tillman', 'Christian Pulisic', 'Brenden Aaronson',
    'Ricardo Pepi', 'Haji Wright', 'Folarin Balogun',
  ],
  UZB: [
    'Utkir Yusupov', 'Farrukh Sayfiev', 'Sherzod Nasrullaev', 'Umar Eshmurodov',
    'Husniddin Aliqulov', 'Rustamjon Ashurmatov', 'Khojiakbar Alijonov', 'Abdukodir Khusanov',
    'Odiljon Hamrobekov', 'Otabek Shukurov', 'Jamshid Iskanderov',
    'Azizbek Turgunboev', 'Khojimat Erkinov', 'Eldor Shomurodov', 'Oston Urunov',
    'Jaloliddin Masharipov', 'Igor Sergeev', 'Abbosbek Fayzullaev',
  ],
}

// FWC section: sticker 00 + FWC-1 to FWC-19 = 20 stickers
const INTRO_STICKERS = [
  {
    code: '00',
    section: 'Opening',
    sectionCode: 'FWC',
    title: 'Logo Panini — We Are Panini',
    isSpecial: false,
    isFoil: false,
    teamCode: null,
    position: 0,
    valueMultiplier: 1,
  },
  // FWC-1 to FWC-8: Emblema, mascotas y países anfitriones (foil)
  ...[
    'Emblema Oficial (1/2)',
    'Emblema Oficial (2/2)',
    'Mascotas Oficiales',
    'Eslogan Oficial',
    'Balón Oficial',
    'Canadá (país anfitrión)',
    'México (país anfitrión)',
    'USA (país anfitrión)',
  ].map((title, i) => ({
    code: `FWC${i + 1}`,
    section: 'Emblema & Mascotas',
    sectionCode: 'FWC',
    title,
    isSpecial: true,
    isFoil: true,
    teamCode: null,
    position: i + 1,
    valueMultiplier: 2,
  })),
  // FWC-9 to FWC-19: Historia de los Mundiales
  ...[
    'Italia 1934 — Campeón: Italia',
    'Brasil 1950 — Campeón: Uruguay',
    'Suiza 1954 — Campeón: Alemania Occ.',
    'Chile 1962 — Campeón: Brasil',
    'Alemania 1974 — Campeón: Alemania Occ.',
    'México 1986 — Campeón: Argentina',
    'USA 1994 — Campeón: Brasil',
    'Corea/Japón 2002 — Campeón: Brasil',
    'Alemania 2006 — Campeón: Italia',
    'Brasil 2014 — Campeón: Alemania',
    'Catar 2022 — Campeón: Argentina',
  ].map((title, i) => ({
    code: `FWC${i + 9}`,
    section: 'Historia del Mundial',
    sectionCode: 'FWC',
    title,
    isSpecial: false,
    isFoil: false,
    teamCode: null,
    position: i + 9,
    valueMultiplier: 1.2,
  })),
]

// Coca-Cola exclusive stickers — 12 total, obtained from Coca-Cola bottles
// Campaign: April 15 – July 31, 2026 · NOT counted in the 980 album stickers
export const COCA_COLA_STICKERS = [
  { code: 'CC1',  player: 'Lamine Yamal',      team: 'ESP', flag: '🇪🇸' },
  { code: 'CC2',  player: 'Joshua Kimmich',     team: 'GER', flag: '🇩🇪' },
  { code: 'CC3',  player: 'Harry Kane',         team: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { code: 'CC4',  player: 'Santiago Giménez',   team: 'MEX', flag: '🇲🇽' },
  { code: 'CC5',  player: 'Antonee Robinson',   team: 'USA', flag: '🇺🇸' },
  { code: 'CC6',  player: 'Jefferson Lerma',    team: 'COL', flag: '🇨🇴' },
  { code: 'CC7',  player: 'Edson Álvarez',      team: 'MEX', flag: '🇲🇽' },
  { code: 'CC8',  player: 'Virgil van Dijk',    team: 'NED', flag: '🇳🇱' },
  { code: 'CC9',  player: 'Alphonso Davies',    team: 'CAN', flag: '🇨🇦' },
  { code: 'CC10', player: 'Weston McKennie',    team: 'USA', flag: '🇺🇸' },
  { code: 'CC11', player: 'Lautaro Martínez',   team: 'ARG', flag: '🇦🇷' },
  { code: 'CC12', player: 'Gabriel Magalhães',  team: 'BRA', flag: '🇧🇷' },
].map((s) => ({
  ...s,
  section: 'Coca-Cola Exclusive',
  sectionCode: 'CC',
  title: s.player,
  isSpecial: true,
  isFoil: false,
  isCocaCola: true,
  teamCode: s.team,
  position: parseInt(s.code.replace('CC', '')),
  valueMultiplier: 3,
}))

export const COCA_COLA_MAP = Object.fromEntries(COCA_COLA_STICKERS.map((s) => [s.code, s]))

// Team sticker positions (20 per team):
// pos 1 = badge (foil), pos 2-12 = 11 players, pos 13 = team photo, pos 14-20 = 7 players
const TEAM_POSITIONS = [
  { pos: 1,  type: 'badge', isSpecial: true,  isFoil: true,  valueMultiplier: 2.5 },
  ...Array.from({ length: 11 }, (_, i) => ({
    pos: i + 2, type: 'player', isSpecial: false, isFoil: false, valueMultiplier: 1,
  })),
  { pos: 13, type: 'photo', isSpecial: false, isFoil: false, valueMultiplier: 1.5 },
  ...Array.from({ length: 7 }, (_, i) => ({
    pos: i + 14, type: 'player', isSpecial: false, isFoil: false, valueMultiplier: 1,
  })),
]

const generateTeamStickers = () => {
  const stickers = []
  TEAMS.forEach((team) => {
    const players = PLAYERS_BY_TEAM[team.code] || []
    TEAM_POSITIONS.forEach(({ pos, type, isSpecial, isFoil, valueMultiplier }) => {
      let title
      if (type === 'badge') {
        title = 'Escudo'
      } else if (type === 'photo') {
        title = 'Foto del equipo'
      } else {
        // pos 2-12 → playerIdx 0-10 ; pos 14-20 → playerIdx 11-17
        const playerIdx = pos <= 12 ? pos - 2 : pos - 3
        title = players[playerIdx] || `Player ${playerIdx + 1}`
      }
      stickers.push({
        code: `${team.code}${pos}`,
        section: team.name,
        sectionCode: team.code,
        title,
        isSpecial,
        isFoil,
        isCocaCola: false,
        teamCode: team.code,
        teamName: team.name,
        flag: team.flag,
        group: team.group,
        position: pos,
        valueMultiplier,
      })
    })
  })
  return stickers
}

// Main album: 20 FWC stickers + 48×20 team stickers = 980 stickers
export const ALBUM_STICKERS = [...INTRO_STICKERS, ...generateTeamStickers()]
export const ALBUM_MAP = Object.fromEntries(ALBUM_STICKERS.map((s) => [s.code, s]))
export const TOTAL_STICKERS = ALBUM_STICKERS.length

// All stickers including Coca-Cola exclusives
export const ALL_STICKERS_MAP = { ...ALBUM_MAP, ...COCA_COLA_MAP }
export const TOTAL_FOIL_STICKERS = ALBUM_STICKERS.filter((s) => s.isFoil).length

export const GROUP_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

export const getTeam = (code) => TEAMS.find((t) => t.code === code)

export const getStickerInfo = (code) => {
  if (!code) return {
    code: '',
    section: 'Unknown',
    sectionCode: 'UNK',
    title: '',
    isSpecial: false,
    isFoil: false,
    isCocaCola: false,
    teamCode: null,
    position: null,
    valueMultiplier: 1,
  }
  const upper = code.toUpperCase().trim()
  return ALL_STICKERS_MAP[upper] || {
    code: upper,
    section: 'Unknown',
    sectionCode: 'UNK',
    title: upper,
    isSpecial: false,
    isFoil: false,
    isCocaCola: false,
    teamCode: null,
    position: null,
    valueMultiplier: 1,
  }
}
