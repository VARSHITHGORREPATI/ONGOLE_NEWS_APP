import { Article, Category } from '@/types';

export const categories: Category[] = [
  { id: 'local', name: 'స్థానిక', nameEn: 'Local', icon: '🏠' },
  { id: 'state', name: 'రాష్ట్రం', nameEn: 'State', icon: '🏛️' },
  { id: 'national', name: 'జాతీయం', nameEn: 'National', icon: '🇮🇳' },
  { id: 'spiritual', name: 'ఆధ్యాత్మికం', nameEn: 'Spiritual', icon: '🙏' },
  { id: 'business', name: 'వ్యాపారం', nameEn: 'Business', icon: '💼' },
  { id: 'sports', name: 'క్రీడలు', nameEn: 'Sports', icon: '🏏' },
  { id: 'movies', name: 'సినిమాలు', nameEn: 'Movies', icon: '🎬' },
  { id: 'agriculture', name: 'వ్యవసాయం', nameEn: 'Agriculture', icon: '🌾' },
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'ఒంగోలులో పండుగ వాతావరణం: సంప్రదాయ నృత్యాలతో కనువిందు',
    titleEn: 'Festive Atmosphere in Ongole: Traditional Dance Spectacle',
    summary: 'ఒంగోలు ప్రధాన వీధులలో సంప్రదాయ నృత్యాల ప్రదర్శనతో ప్రజలు ఉత్సాహంగా పాల్గొన్నారు. స్థానిక కళాకారులు అద్భుత ప్రదర్శన ఇచ్చారు.',
    summaryEn: 'People enthusiastically participated in traditional dance performances on the main streets of Ongole. Local artists gave spectacular performances.',
    content: `ఒంగోలు నగరంలో నిన్న రాత్రి సంప్రదాయ నృత్యాల ప్రదర్శనతో ప్రజలు ఉత్సాహంగా పాల్గొన్నారు. స్థానిక కళాకారులు అద్భుత ప్రదర్శన ఇచ్చారు. ఈ కార్యక్రమానికి వేలాది మంది స్థానికులు హాజరయ్యారు.

ఈ కార్యక్రమం ఒంగోలు పురపాలక సంఘం ఆధ్వర్యంలో నిర్వహించబడింది. ముఖ్య అతిథిగా హాజరైన పట్టణ మేయర్ కార్యక్రమాన్ని ప్రారంభించారు. స్థానిక కళాకారులు కూచిపూడి, భరతనాట్యం, ఫోక్ డాన్స్ వంటి వివిధ నృత్య రూపాలతో ప్రేక్షకులను మంత్రముగ్ధులను చేశారు.

"ఇలాంటి కార్యక్రమాలు మన సంస్కృతిని పరిరక్షించడానికి దోహదపడతాయి" అని మేయర్ అన్నారు. కార్యక్రమంలో పాల్గొన్న కళాకారులకు బహుమతులు ప్రదానం చేశారు.`,
    contentEn: `Last night, people enthusiastically participated in traditional dance performances in Ongole city. Local artists gave spectacular performances. Thousands of locals attended this event.

This event was organized under the auspices of Ongole Municipal Corporation. The town mayor inaugurated the event as the chief guest. Local artists mesmerized the audience with various dance forms including Kuchipudi, Bharatanatyam, and Folk Dance.

"Such events help preserve our culture," said the mayor. Prizes were presented to the participating artists.`,
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    category: 'local',
    timestamp: '2026-04-25T08:30:00',
    author: 'రామేశ్వరం ప్రసాద్',
    readTime: 3,
    featured: true,
    trending: true,
  },
  {
    id: '2',
    title: 'ఆంధ్రప్రదేశ్ బడ్జెట్ 2026: రైతులకు గుడ్ న్యూస్',
    titleEn: 'AP Budget 2026: Good News for Farmers',
    summary: 'రాష్ట్ర బడ్జెట్‌లో రైతులకు పెద్ద పీట వేయడంతో అన్నదాతలు సంతోషం వ్యక్తం చేస్తున్నారు. వ్యవసాయానికి రికార్డు స్థాయిలో నిధులు కేటాయింపు.',
    summaryEn: 'Farmers are expressing happiness as the state budget gives top priority to agriculture. Record-level funds have been allocated to agriculture.',
    content: `ఆంధ్రప్రదేశ్ ప్రభుత్వం 2026-27 ఆర్థిక సంవత్సరానికి గాను బడ్జెట్‌ను ప్రవేశపెట్టింది. ఈ బడ్జెట్‌లో వ్యవసాయ రంగానికి రికార్డు స్థాయిలో రూ. 35,000 కోట్లు కేటాయించారు.

రైతులకు ఉచిత విద్యుత్ సరఫరా కొనసాగించనున్నట్లు ప్రకటించారు. దీనితో పాటు, పంటల బీమా పథకాన్ని మరింత విస్తృతం చేయనున్నారు. వ్యవసాయ భూములకు రూ. 5 లక్షల వరకు రుణ మాఫీ కూడా ప్రకటించారు.

"ఈ బడ్జెట్ రైతుల కలను నిజం చేస్తుంది" అని ముఖ్యమంత్రి అన్నారు.`,
    contentEn: `The Andhra Pradesh government has presented the budget for the financial year 2026-27. A record amount of Rs. 35,000 crores has been allocated to the agriculture sector in this budget.

Free electricity supply to farmers will continue. Along with this, the crop insurance scheme will be further expanded. Loan waiver up to Rs. 5 lakhs for agricultural land has also been announced.

"This budget will make farmers' dreams come true," said the Chief Minister.`,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    category: 'state',
    timestamp: '2026-04-25T07:00:00',
    author: 'వెంకటేశ్వరరావు',
    readTime: 4,
    featured: true,
  },
  {
    id: '3',
    title: 'దేశంలో తాజాగా 5,234 కొత్త కోవిడ్ కేసులు నమోదు',
    titleEn: '5,234 New COVID Cases Recorded in India',
    summary: 'దేశవ్యాప్తంగా కరోనా వైరస్ కేసులు మళ్ళీ పెరుగుతున్నాయి. కేంద్ర ఆరోగ్య శాఖ అప్రమత్తం చేసింది.',
    summaryEn: 'Coronavirus cases are rising again across the country. The Union Health Ministry has issued an alert.',
    content: `దేశంలో గత 24 గంటల్లో 5,234 కొత్త కోవిడ్ కేసులు నమోదు కాగా, 12 మంది మరణించారు. కేరళ, కర్ణాటక, మహారాష్ట్ర రాష్ట్రాల్లో కేసులు ఎక్కువగా నమోదవుతున్నాయి.

కేంద్ర ఆరోగ్య శాఖ జాగ్రత్తగా ఉండాలని సూచించింది. మాస్క్ ధరణ, శానిటైజేషన్ తప్పనిసరి చేయాలని ప్రజలకు సూచనలు ఇచ్చారు. టీకా తీసుకోని వారు వెంటనే వ్యాక్సిన్ తీసుకోవాలని కోరారు.`,
    contentEn: `In the last 24 hours, 5,234 new COVID cases were recorded in the country, and 12 people died. Cases are being recorded more in Kerala, Karnataka, and Maharashtra states.

The Union Health Ministry has advised people to be cautious. Wearing masks and sanitization have been made mandatory. Those who have not been vaccinated are urged to get vaccinated immediately.`,
    imageUrl: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=800&q=80',
    category: 'national',
    timestamp: '2026-04-24T22:00:00',
    author: 'న్యూస్ డెస్క్',
    readTime: 2,
    trending: true,
  },
  {
    id: '4',
    title: 'శ్రీశైలం మల్లికార్జునుని ఆలయంలో బ్రహ్మోత్సవాలు ప్రారంభం',
    titleEn: 'Brahmotsavams Begin at Srisailam Mallikarjuna Temple',
    summary: 'శ్రీశైలం మల్లికార్జునుని ఆలయంలో వైశాఖ మాస బ్రహ్మోత్సవాలు గొప్ప వైభవంగా ప్రారంభమయ్యాయి. లక్షలాది భక్తులు పాల్గొన్నారు.',
    summaryEn: 'The Vaishakha month Brahmotsavams at Srisailam Mallikarjuna Temple began with great grandeur. Lakhs of devotees participated.',
    content: `శ్రీశైలం మల్లికార్జునుని ఆలయంలో వైశాఖ మాస బ్రహ్మోత్సవాలు నిన్న గొప్ప వైభవంగా ప్రారంభమయ్యాయి. ద్వజారోహణంతో ఉత్సవాలను ప్రారంభించారు. లక్షలాది భక్తులు ఈ కార్యక్రమానికి హాజరయ్యారు.

ఆలయం అంతటా పుష్పాలతో అలంకరించారు. వివిధ వాహన సేవలు, అభిషేకాలు, ప్రత్యేక పూజలు నిర్వహిస్తున్నారు. భక్తులకు అన్నప్రసాద వితరణ కూడా నిర్వహిస్తున్నారు.`,
    contentEn: `The Vaishakha month Brahmotsavams at Srisailam Mallikarjuna Temple began yesterday with great grandeur. The festivities were inaugurated with Dwajarohanam. Lakhs of devotees attended this event.

The temple was decorated with flowers throughout. Various Vahana Sevas, Abhishekams, and special pujas are being conducted. Annaprasada distribution is also being organized for the devotees.`,
    imageUrl: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=800&q=80',
    category: 'spiritual',
    timestamp: '2026-04-25T06:00:00',
    author: 'భక్తి ప్రసాద్',
    readTime: 3,
    featured: true,
  },
  {
    id: '5',
    title: 'ఒంగోలు బస్ స్టాండ్ వద్ద కొత్త షాపింగ్ కాంప్లెక్స్ ప్రారంభం',
    titleEn: 'New Shopping Complex Launched at Ongole Bus Stand',
    summary: 'ఒంగోలు బస్ స్టాండ్ సమీపంలో కొత్త షాపింగ్ కాంప్లెక్స్ ప్రారంభించబడింది. 50కు పైగా దుకాణాలు, ఫుడ్ కోర్ట్ ఉన్నాయి.',
    summaryEn: 'A new shopping complex has been launched near Ongole Bus Stand. It has more than 50 shops and a food court.',
    content: `ఒంగోలు బస్ స్టాండ్ సమీపంలో కొత్త షాపింగ్ కాంప్లెక్స్ నిన్న ప్రారంభించబడింది. ఈ కాంప్లెక్స్‌లో 50కు పైగా దుకాణాలు, బహుళాంశ ఫుడ్ కోర్ట్, సినిమా థియేటర్ కూడా ఉన్నాయి.

"ఒంగోలు వాసులకు ప్రపంచస్థాయి షాపింగ్ అనుభవం అందించడమే మా లక్ష్యం" అని కాంప్లెక్స్ యజమాని అన్నారు. ప్రారంభ ఆఫర్లలో 50% వరకు డిస్కౌంట్ ప్రకటించారు.`,
    contentEn: `A new shopping complex was launched yesterday near Ongole Bus Stand. This complex has more than 50 shops, a multi-cuisine food court, and a movie theater.

"Our goal is to provide a world-class shopping experience for Ongole residents," said the complex owner. Opening offers include discounts up to 50%.`,
    imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80',
    category: 'business',
    timestamp: '2026-04-24T18:00:00',
    author: 'వ్యాపార విలాసం',
    readTime: 2,
    trending: true,
  },
  {
    id: '6',
    title: 'IPL 2026: హైదరాబాద్ వర్సెస్ బెంగళూరు మ్యాచ్ రద్దు',
    titleEn: 'IPL 2026: Hyderabad vs Bangalore Match Cancelled',
    summary: 'భారీ వర్షం కారణంగా హైదరాబాద్ మరియు బెంగళూరు మధ్య జరగవలసిన IPL మ్యాచ్ రద్దు చేయబడింది. రీషెడ్యూల్ తేదీ ప్రకటించబడింది.',
    summaryEn: 'The IPL match between Hyderabad and Bangalore was cancelled due to heavy rain. The rescheduled date has been announced.',
    content: `రాజీవ్ గాంధీ స్టేడియంలో జరగవలసిన హైదరాబాద్ vs బెంగళూరు IPL మ్యాచ్ భారీ వర్షం కారణంగా రద్దు చేయబడింది. మ్యాచ్ ప్రారంభానికి గంట ముందు వర్షం మొదలవ్వడంతో పిచ్‌పై నీరు నిలవడం మొదలైంది.

ఈ మ్యాచ్ మే 2న మళ్ళీ నిర్వహించనున్నట్లు IPL గవర్నింగ్ కౌన్సిల్ ప్రకటించింది. టిక్కెట్ హోల్డర్లకు రీఫండ్ లేదా అదే సీట్లు మే 2న అనుమతించనున్నారు.`,
    contentEn: `The Hyderabad vs Bangalore IPL match scheduled at Rajiv Gandhi Stadium was cancelled due to heavy rain. Rain started an hour before the match, causing waterlogging on the pitch.

The IPL Governing Council has announced that this match will be replayed on May 2. Ticket holders will be given refunds or the same seats will be allowed on May 2.`,
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
    category: 'sports',
    timestamp: '2026-04-24T20:00:00',
    author: 'క్రీడా ప్రతినిధి',
    readTime: 2,
    trending: true,
  },
  {
    id: '7',
    title: 'చిరంజీవి - శంకర్ కాంబినేషన్‌లో రాబోతున్న మెగా ప్రాజెక్ట్',
    titleEn: 'Mega Project Coming in Chiranjeevi-Shankar Combination',
    summary: 'మెగాస్టార్ చిరంజీవి మరియు దర్శకుడు శంకర్ కాంబినేషన్‌లో ఒక పాన్ ఇండియా మూవీ రాబోతోంది. ప్రీ ప్రొడక్షన్ పనులు మొదలయ్యాయి.',
    summaryEn: 'A pan-India movie is coming in the combination of Megastar Chiranjeevi and director Shankar. Pre-production work has begun.',
    content: `మెగాస్టార్ చిరంజీవి మరియు దర్శక ధీరుడు శంకర్ కాంబినేషన్‌లో ఒక పాన్ ఇండియా మూవీ రాబోతోంది. ఈ సినిమా ప్రీ ప్రొడక్షన్ పనులు ఇప్పటికే మొదలయ్యాయి.

ఈ చిత్రంలో చిరంజీవి మూడు విభిన్న పాత్రలలో కనిపించనున్నారు. వసూళ్ళను పరంగా ఇండియన్ సినిమా రికార్డులను బద్దలు కొట్టేలా ఈ చిత్రం ఉండబోతోందని సమాచారం.`,
    contentEn: `A pan-India movie is coming in the combination of Megastar Chiranjeevi and director Shankar. Pre-production work has already begun.

Chiranjeevi will be seen in three different roles in this film. It is reported that this film is going to break Indian cinema records in terms of collections.`,
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
    category: 'movies',
    timestamp: '2026-04-24T16:00:00',
    author: 'సినీ గప్షప్',
    readTime: 2,
  },
  {
    id: '8',
    title: 'వరి పంటకు కొత్త రకం ఎరువు: రైతులకు శుభవార్త',
    titleEn: 'New Fertilizer Variety for Paddy: Good News for Farmers',
    summary: 'వరి పంటకు వినియోగించే కొత్త రకం సేంద్రీయ ఎరువును వ్యవసాయ శాస్త్రవేత్తలు అభివృద్ధి చేశారు. దీనితో దిగుబడి 30% పెరుగనుంది.',
    summaryEn: 'Agricultural scientists have developed a new type of organic fertilizer for paddy crop. Yield is expected to increase by 30%.',
    content: `వరి పంటకు వినియోగించే కొత్త రకం సేంద్రీయ ఎరువును వ్యవసాయ శాస్త్రవేత్తలు అభివృద్ధి చేశారు. ఈ ఎరువును వాడితే దిగుబడి 30% పెరుగనుందని అంచనా.

ఈ ఎరువు పూర్తిగా సేంద్రీయ పదార్థాలతో తయారు చేయబడింది. రసాయన ఎరువుల వల్ల వచ్చే నష్టం లేకుండా పంట దిగుబడిని పెంచగలదు. ప్రస్తుతం ఫీల్డ్ ట్రయల్స్ నిర్వహిస్తున్నారు.`,
    contentEn: `Agricultural scientists have developed a new type of organic fertilizer for paddy crop. It is estimated that using this fertilizer will increase yield by 30%.

This fertilizer is made entirely from organic materials. It can increase crop yield without the damage caused by chemical fertilizers. Field trials are currently being conducted.`,
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80',
    category: 'agriculture',
    timestamp: '2026-04-24T14:00:00',
    author: 'ఆగ్రో ప్రకాశ్',
    readTime: 3,
  },
  {
    id: '9',
    title: 'ఒంగోలు పాలిటెక్నిక్ కళాశాలలో జాబ్ మేళా విజయవంతం',
    titleEn: 'Job Fair Successful at Ongole Polytechnic College',
    summary: 'ఒంగోలు పాలిటెక్నిక్ కళాశాలలో నిర్వహించిన జాబ్ మేళాలో 500 మందికి పైగా విద్యార్థులకు ఉద్యోగాలు లభించాయి.',
    summaryEn: 'More than 500 students got jobs in the job fair organized at Ongole Polytechnic College.',
    content: `ఒంగోలు పాలిటెక్నిక్ కళాశాలలో నిర్వహించిన జాబ్ మేళా విజయవంతంగా ముగిసింది. ఈ మేళాలో 50కు పైగా కంపెనీలు పాల్గొన్నాయి. 500 మందికి పైగా విద్యార్థులకు ఉద్యోగాలు లభించాయి.

టీసీఎస్, ఇన్ఫోసిస్, విప్రో వంటి ప్రముఖ కంపెనీలు ఈ జాబ్ మేళాలో పాల్గొన్నాయి. విద్యార్థులలో ఎక్కువ మందికి సాఫ్ట్‌వేర్ ఇంజనీర్ పదవులు లభించాయి.`,
    contentEn: `The job fair organized at Ongole Polytechnic College was successfully completed. More than 50 companies participated in this fair. More than 500 students got jobs.

Major companies like TCS, Infosys, and Wipro participated in this job fair. Most of the students got software engineer positions.`,
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
    category: 'local',
    timestamp: '2026-04-24T12:00:00',
    author: 'విద్యా ప్రకాశ్',
    readTime: 2,
  },
  {
    id: '10',
    title: 'ప్రకాశం జిల్లాలో కొత్త మెడికల్ కళాశాలకు ఆమోదం',
    titleEn: 'Approval for New Medical College in Prakasam District',
    summary: 'ప్రకాశం జిల్లాలో కొత్త మెడికల్ కళాశాల ఏర్పాటుకు కేంద్ర ప్రభుత్వం ఆమోదం తెలిపింది. 150 మంది విద్యార్థులకు ప్రవేశం లభిస్తుంది.',
    summaryEn: 'The central government has approved the establishment of a new medical college in Prakasam district. 150 students will get admission.',
    content: `ప్రకాశం జిల్లాలో కొత్త మెడికల్ కళాశాల ఏర్పాటుకు కేంద్ర ప్రభుత్వం ఆమోదం తెలిపింది. ఈ కళాశాలలో 150 మంది విద్యార్థులకు ప్రవేశం లభిస్తుంది.

ఈ కళాశాల ఒంగోలు నగరానికి 15 కిలోమీటర్ల దూరంలో ఏర్పాటు చేయనున్నారు. మొదటి విద్యా సంవత్సరం 2026-27 నుండి ప్రారంభించనున్నారు. సూపర్ స్పెషాలిటీ హాస్పిటల్ కూడా ఏర్పాటు చేయనున్నారు.`,
    contentEn: `The central government has approved the establishment of a new medical college in Prakasam district. 150 students will get admission in this college.

This college will be set up 15 kilometers away from Ongole city. The first academic year will start from 2026-27. A super specialty hospital will also be set up.`,
    imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80',
    category: 'state',
    timestamp: '2026-04-24T10:00:00',
    author: 'ఆరోగ్య ప్రతినిధి',
    readTime: 2,
  },
  {
    id: '11',
    title: 'గుంటూరు జిల్లాలో భారీ వర్షం: పంట నష్టం ఆందోళన',
    titleEn: 'Heavy Rain in Guntur District: Crop Loss Concerns',
    summary: 'గుంటూరు జిల్లాలో భారీ వర్షం కారణంగా వేల ఎకరాల పంట నష్టపోయింది. రైతులు ఆందోళన వ్యక్తం చేస్తున్నారు.',
    summaryEn: 'Thousands of acres of crops have been damaged due to heavy rain in Guntur district. Farmers are expressing concern.',
    content: `గుంటూరు జిల్లాలో నిన్న రాత్రి నుండి కురుస్తున్న భారీ వర్షం కారణంగా వేల ఎకరాల పంట నష్టపోయింది. ముఖ్యంగా మిర్చి, పత్తి పంటలు ఎక్కువగా దెబ్బతిన్నాయి.

రైతులు తమ నష్టాన్ని ప్రభుత్వం దృష్టికి తీసుకెళ్ళాలని కోరుతున్నారు. వెంటనే సహాయక చర్యలు తీసుకోవాలని డిమాండ్ చేస్తున్నారు.`,
    contentEn: `Thousands of acres of crops have been damaged due to heavy rain falling in Guntur district since last night. Chilli and cotton crops have been particularly affected.

Farmers are requesting the government to take notice of their losses. They are demanding immediate relief measures.`,
    imageUrl: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80',
    category: 'state',
    timestamp: '2026-04-24T08:00:00',
    author: 'రైతు మిత్రుడు',
    readTime: 2,
  },
  {
    id: '12',
    title: 'దిల్లీలో వాయు కాలుష్యం మళ్ళీ పెరుగుదల',
    titleEn: 'Air Pollution Rising Again in Delhi',
    summary: 'దిల్లీలో వాయు కాలుష్యం మళ్ళీ పెరుగుతోంది. AQI 400ను దాటింది. పాఠశాలలకు సెలవు ప్రకటించారు.',
    summaryEn: 'Air pollution is rising again in Delhi. AQI has crossed 400. Schools have been given holidays.',
    content: `దిల్లీలో వాయు కాలుష్యం మళ్ళీ ప్రమాదకర స్థాయికి చేరుకుంది. AQI 400ను దాటడంతో పాఠశాలలకు సెలవు ప్రకటించారు. కార్యాలయాలకు వర్క్ ఫ్రమ్ హోమ్ అమలు చేశారు.

పరిశ్రమలపై నియంత్రణలు పటిష్టం చేశారు. వాహనాల రాకపోకలపై నిబంధనలు విధించారు. ప్రజలు బయటకు వెళ్ళకుండా ఉండాలని సూచించారు.`,
    contentEn: `Air pollution in Delhi has again reached dangerous levels. As AQI crossed 400, schools have been given holidays. Work from home has been implemented for offices.

Controls on industries have been tightened. Restrictions have been imposed on vehicle movement. People are advised not to go outside.`,
    imageUrl: 'https://images.unsplash.com/photo-1564403256236-8f6929897f45?w=800&q=80',
    category: 'national',
    timestamp: '2026-04-23T20:00:00',
    author: 'పర్యావరణ ప్రతినిధి',
    readTime: 2,
  },
];

export function getArticleById(id: string): Article | undefined {
  return articles.find(article => article.id === id);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(article => article.category === category);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter(article => article.featured);
}

export function getTrendingArticles(): Article[] {
  return articles.filter(article => article.trending);
}

export function getLatestArticles(count: number = 10): Article[] {
  return articles
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, count);
}

export function getRelatedArticles(currentId: string, category: string, count: number = 3): Article[] {
  return articles
    .filter(article => article.id !== currentId && article.category === category)
    .slice(0, count);
}
