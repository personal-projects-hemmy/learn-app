/* EN/FR Vocabulary – intermediate/advanced, by topic.
   Row: [english, french, extra accepted FR answers (|), extra accepted EN answers (|)] */
(function () {
  const U = (title, desc, icon, color, rows) => ({
    title, desc, icon, color,
    items: rows.map(([en, fr, fa, ea]) => ({
      en, fr,
      alt: fa ? fa.split('|').map(s => s.trim()).filter(Boolean) : [],
      ealt: ea ? ea.split('|').map(s => s.trim()).filter(Boolean) : []
    }))
  });
  const CHARS = ['é', 'è', 'ê', 'à', 'â', 'ç', 'î', 'ô', 'û', 'ù', 'œ', "'"];
  registerCourse({
    id: 'en-fr-vocabulary', rev: 2,
    theme: {c:'#58cc02',cd:'#46a302',cl:'#e7f9d7',acc:'#1cb0f6',bg:'#f7fbf3'},
    desc: 'Intermediate to advanced English ⇄ French, by topic: motorcycles, IT, beauty, business, travel, health, law and the environment.',
    itemNoun: 'terms', lang: 'en', name: 'EN/FR Vocabulary', short: 'EN ⇄ FR', logo: '🇫🇷', mascot: '🥐',
    lessonsPerUnit: 3, lessonSize: 10, finalSize: 12, perItem: 2, defaultGoal: 20,
    footer: 'Type either the main translation or a listed alternative. Accents are checked gently: you will get a reminder if one is missing. Articles (le, la, les, l\', un, une…) are optional.',
    units: [
      U('Motorcycles', 'Parts, riding and workshop maintenance', '🏍️', '#e8590c', [
        ['motorcycle', 'la moto', 'motocyclette|motocycle', 'motorbike|bike'],
        ['handlebar', 'le guidon', 'guidon'],
        ['throttle', 'la poignée d\'accélérateur', 'accélérateur|poignee d\'accelerateur'],
        ['clutch', 'l\'embrayage', 'embrayage'],
        ['gearbox', 'la boîte de vitesses', 'boite de vitesses|boîte de vitesse', 'transmission'],
        ['drive chain', 'la chaîne de transmission', 'chaîne|chaine|chaine de transmission', 'chain'],
        ['fairing', 'le carénage', 'carenage'],
        ['kickstand', 'la béquille', 'béquille latérale|bequille'],
        ['helmet', 'le casque', 'casque intégral|casque moto'],
        ['visor', 'la visière', 'écran de casque|visiere'],
        ['engine displacement', 'la cylindrée', 'cylindree', 'displacement|capacity'],
        ['oil change', 'la vidange', 'vidange d\'huile', 'oil service'],
        ['spark plug', 'la bougie d\'allumage', 'bougie'],
        ['puncture', 'la crevaison', 'pneu crevé', 'flat tire|flat tyre'],
        ['exhaust pipe', 'le pot d\'échappement', 'échappement|pot d\'echappement|échappement moto', 'exhaust|muffler'],
        ['shock absorber', 'l\'amortisseur', 'amortisseur', 'shock'],
        ['front fork', 'la fourche', 'fourche avant', 'fork'],
        ['to stall', 'caler', 'je cale|calé'],
        ['to overtake', 'dépasser', 'doubler'],
        ['high-visibility vest', 'le gilet haute visibilité', 'gilet fluo|gilet jaune|gilet de haute visibilité|gilet haute visibilite', 'hi-vis vest|hi vis vest|high vis vest']
      ]),
      U('IT & Tech', 'Development, networks, hardware and office IT', '💻', '#1c7ed6', [
        ['software', 'le logiciel', 'application|appli', 'program|app'],
        ['hardware', 'le matériel', 'matériel informatique|materiel'],
        ['operating system', 'le système d\'exploitation', 'SE|systeme d\'exploitation', 'OS'],
        ['firewall', 'le pare-feu', 'parefeu|firewall'],
        ['bandwidth', 'la bande passante'],
        ['bug', 'le bogue', 'bug|défaut'],
        ['to debug', 'déboguer', 'debugger|débugger|débogger'],
        ['source code', 'le code source', 'code'],
        ['pull request', 'la pull request', 'demande de fusion|requête de tirage|PR'],
        ['database', 'la base de données', 'BDD|base de donnees', 'DB'],
        ['API', 'l\'API', 'API|interface de programmation'],
        ['cloud computing', 'le cloud', 'informatique en nuage|informatique dans le nuage', 'the cloud'],
        ['server', 'le serveur'],
        ['router', 'le routeur'],
        ['IP address', 'l\'adresse IP', 'adresse IP'],
        ['encryption', 'le chiffrement', 'cryptage|chiffrement des données'],
        ['backup', 'la sauvegarde', 'copie de sauvegarde', 'back-up'],
        ['spreadsheet', 'le tableur', 'feuille de calcul'],
        ['phishing', 'le hameçonnage', 'phishing|hameconnage'],
        ['malware', 'le logiciel malveillant', 'maliciel|malware']
      ]),
      U('Cosmetics & Beauty', 'Skincare, makeup and ingredients', '💄', '#e64980', [
        ['skincare', 'les soins de la peau', 'soin de la peau|soins de peau', 'skin care'],
        ['moisturizer', 'la crème hydratante', 'hydratant|crème hydratante visage|creme hydratante', 'moisturiser|hydrating cream'],
        ['cleanser', 'le nettoyant', 'nettoyant visage|lait démaquillant', 'face wash|facial cleanser'],
        ['toner', 'la lotion tonique', 'tonique|toner'],
        ['serum', 'le sérum', 'serum'],
        ['sunscreen', 'la crème solaire', 'écran solaire|protection solaire|creme solaire', 'sun cream|sunblock|SPF'],
        ['makeup', 'le maquillage', '', 'make-up|make up'],
        ['foundation', 'le fond de teint', 'fond de teint fluide'],
        ['concealer', 'l\'anti-cernes', 'anticernes|correcteur|anti cernes'],
        ['mascara', 'le mascara'],
        ['lipstick', 'le rouge à lèvres', 'rouge a levres'],
        ['blush', 'le fard à joues', 'blush|fard a joues'],
        ['eyeshadow', 'le fard à paupières', 'fard a paupieres|ombre à paupières', 'eye shadow'],
        ['eyeliner', 'l\'eyeliner', 'eye-liner|crayon yeux|liner'],
        ['exfoliant', 'l\'exfoliant', 'gommage|exfoliant visage', 'exfoliator|scrub'],
        ['retinol', 'le rétinol', 'retinol'],
        ['hyaluronic acid', 'l\'acide hyaluronique', 'acide hyaluronique'],
        ['fragrance', 'le parfum', 'fragrance|senteur', 'perfume|scent'],
        ['shade', 'la teinte', 'nuance|coloris', 'colour|color'],
        ['primer', 'la base de teint', 'primer|base maquillage']
      ]),
      U('Business & Work', 'Office life, finance and corporate language', '💼', '#7950f2', [
        ['invoice', 'la facture', 'note'],
        ['quote', 'le devis', 'estimation|offre de prix', 'quotation|estimate'],
        ['deadline', 'la date limite', 'délai|échéance|delai'],
        ['stakeholder', 'la partie prenante', 'intervenant|parties prenantes'],
        ['turnover', 'le chiffre d\'affaires', 'CA|chiffre d\'affaire', 'revenue|sales revenue'],
        ['cash flow', 'la trésorerie', 'flux de trésorerie|tresorerie'],
        ['to hire', 'embaucher', 'recruter|engager', 'to recruit'],
        ['to fire', 'licencier', 'renvoyer|virer', 'to sack|to dismiss'],
        ['shareholder', 'l\'actionnaire', 'actionnaire'],
        ['merger', 'la fusion', 'fusion-acquisition|fusion d\'entreprises', 'merger and acquisition|M&A'],
        ['subsidiary', 'la filiale'],
        ['supply chain', 'la chaîne d\'approvisionnement', 'chaîne logistique|chaine d\'approvisionnement'],
        ['trademark', 'la marque déposée', 'marque|marque commerciale', 'trade mark|brand'],
        ['non-disclosure agreement', 'l\'accord de confidentialité', 'NDA|clause de confidentialité|accord de confidentialite', 'NDA|confidentiality agreement'],
        ['profit margin', 'la marge bénéficiaire', 'marge|marge de profit', 'margin'],
        ['remote work', 'le télétravail', 'travail à distance|teletravail', 'working from home|WFH|telework'],
        ['meeting minutes', 'le compte rendu', 'procès-verbal|relevé de décisions|CR|compte-rendu', 'minutes|the minutes'],
        ['procurement', 'les achats', 'approvisionnement|service achats', 'purchasing']
      ]),
      U('Travel & Logistics', 'Flights, freight, customs and delivery', '📦', '#2b70c9', [
        ['shipment', 'l\'expédition', 'envoi|expedition', 'consignment'],
        ['warehouse', 'l\'entrepôt', 'entrepot|hangar', 'depot'],
        ['freight', 'le fret', 'transport de marchandises', 'cargo freight'],
        ['customs', 'la douane', 'douanes', 'customs office'],
        ['tracking number', 'le numéro de suivi', 'numéro de tracking|numero de suivi', 'tracking code|tracking ID'],
        ['delay', 'le retard', 'délai supplémentaire'],
        ['layover', 'l\'escale', 'escale', 'stopover|connection'],
        ['connecting flight', 'la correspondance', 'vol de correspondance', 'connection|onward flight'],
        ['boarding pass', 'la carte d\'embarquement', 'billet d\'embarquement', 'boarding card'],
        ['to check in', 's\'enregistrer', 'enregistrer|enregistrement', 'to check-in'],
        ['jet lag', 'le décalage horaire', 'decalage horaire'],
        ['bill of lading', 'le connaissement', 'connaissement maritime', 'B/L|BOL'],
        ['pallet', 'la palette', 'palette de transport'],
        ['last-mile delivery', 'la livraison du dernier kilomètre', 'dernier kilomètre|livraison last mile'],
        ['customs clearance', 'le dédouanement', 'dédouaner|dedouanement'],
        ['cargo', 'la cargaison', 'fret|chargement'],
        ['freight forwarder', 'le transitaire', 'commissionnaire de transport', 'forwarding agent'],
        ['lead time', 'le délai de livraison', 'délai d\'approvisionnement|delai de livraison', 'delivery time']
      ]),
      U('Health & Medicine', 'At the doctor, tests, treatment and recovery', '🩺', '#e03131', [
        ['prescription', 'l\'ordonnance', 'ordonnance médicale|ordonnance'],
        ['side effect', 'l\'effet secondaire', 'effet indésirable|effets secondaires', 'adverse effect'],
        ['diagnosis', 'le diagnostic', '', 'diagnose'],
        ['symptom', 'le symptôme', 'symptomes|signe clinique', 'symptoms'],
        ['blood test', 'la prise de sang', 'analyse de sang|bilan sanguin'],
        ['MRI', 'l\'IRM', 'IRM|imagerie par résonance magnétique'],
        ['X-ray', 'la radiographie', 'radio|rayon X', 'xray|x ray'],
        ['vaccine', 'le vaccin', 'vaccination', 'jab|immunization|immunisation'],
        ['inflammation', 'l\'inflammation', 'inflammation'],
        ['chronic', 'chronique'],
        ['dosage', 'la posologie', 'dosage|dose'],
        ['health insurance', 'l\'assurance maladie', 'sécurité sociale|mutuelle|assurance maladie', 'medical insurance'],
        ['appointment', 'le rendez-vous', 'RDV|rendez vous', 'booking'],
        ['surgery', 'la chirurgie', 'opération|operation chirurgicale', 'operation'],
        ['general practitioner', 'le médecin généraliste', 'généraliste|médecin de famille|medecin generaliste', 'GP|family doctor'],
        ['specialist', 'le spécialiste', 'médecin spécialiste'],
        ['recovery', 'la convalescence', 'rétablissement|guérison|retablissement', 'convalescence'],
        ['blood pressure', 'la tension artérielle', 'tension|pression artérielle', 'BP']
      ]),
      U('Law & Admin', 'Paperwork, contracts, courts and formalities', '⚖️', '#495057', [
        ['identity card', 'la carte d\'identité', 'pièce d\'identité|CNI|carte d\'identite', 'ID card|ID'],
        ['residency permit', 'le titre de séjour', 'carte de séjour|titre de sejour', 'residence permit'],
        ['to file a complaint', 'porter plainte', 'déposer une plainte|deposer une plainte'],
        ['lawsuit', 'le procès', 'action en justice|poursuite|proces', 'court case|legal action'],
        ['lawyer', 'l\'avocat', 'avocate|avocat', 'solicitor|attorney|barrister'],
        ['contract', 'le contrat', 'convention'],
        ['clause', 'la clause', 'article'],
        ['fine', 'l\'amende', 'amende|contravention'],
        ['to appeal', 'faire appel', 'interjeter appel'],
        ['power of attorney', 'la procuration', 'mandat'],
        ['sworn statement', 'l\'attestation sur l\'honneur', 'déclaration sous serment|attestation sur l\'honneur', 'affidavit|statutory declaration'],
        ['tax return', 'la déclaration d\'impôts', 'déclaration fiscale|declaration d\'impots', 'tax declaration'],
        ['receipt', 'le reçu', 'récépissé|justificatif|recu|ticket de caisse', 'proof of purchase'],
        ['registered mail', 'la lettre recommandée', 'recommandé|lettre recommandee', 'recorded delivery|certified mail'],
        ['notary', 'le notaire', 'notaire'],
        ['court', 'le tribunal', 'cour|palais de justice'],
        ['plaintiff', 'le demandeur', 'plaignant|demanderesse'],
        ['bailiff', 'l\'huissier', 'huissier de justice|huissier']
      ]),
      U('Environment & Energy', 'Climate, power, resources and sustainability', '🌱', '#2f9e44', [
        ['greenhouse gas', 'le gaz à effet de serre', 'GES|gaz a effet de serre', 'GHG'],
        ['carbon footprint', 'l\'empreinte carbone', 'empreinte carbone|bilan carbone'],
        ['renewable energy', 'les énergies renouvelables', 'énergie renouvelable|energies renouvelables|EnR', 'renewables'],
        ['wind turbine', 'l\'éolienne', 'eolienne|turbine éolienne'],
        ['solar panel', 'le panneau solaire', 'panneau photovoltaïque|panneau PV|panneau photovoltaique', 'PV panel|photovoltaic panel'],
        ['nuclear power', 'l\'énergie nucléaire', 'nucléaire|energie nucleaire', 'nuclear energy'],
        ['biodiversity', 'la biodiversité', 'biodiversite'],
        ['deforestation', 'la déforestation', 'deboisement|déboisement'],
        ['recycling', 'le recyclage', 'tri sélectif'],
        ['landfill', 'la décharge', 'centre d\'enfouissement|décharge publique', 'dumpsite'],
        ['wastewater', 'les eaux usées', 'eaux usees|eaux résiduaires', 'sewage|waste water'],
        ['sustainability', 'le développement durable', 'durabilité|developpement durable', 'sustainable development'],
        ['fossil fuel', 'le combustible fossile', 'énergie fossile|combustibles fossiles', 'fossil fuels'],
        ['charging station', 'la borne de recharge', 'borne de charge|station de recharge', 'charge point|EV charger'],
        ['insulation', 'l\'isolation', 'isolation thermique|isolation phonique'],
        ['heat pump', 'la pompe à chaleur', 'PAC|pompe a chaleur'],
        ['raw material', 'la matière première', 'matiere premiere|matière premiere', 'raw materials'],
        ['drought', 'la sécheresse', 'secheresse'],
        ['flood', 'l\'inondation', 'inondation|crue', 'flooding']
      ])
    ],
    makeExercises(it, c) {
      const fr = { text: it.fr, lang: 'fr-FR' };
      const mk = (correct, others) => { const o = c.shuffle([correct].concat(others)); return { options: o, correct: o.indexOf(correct) }; };
      const also = (it.alt && it.alt.length) ? ` · also: ${it.alt.map(c.esc).join(', ')}` : '';
      const ex = `🇬🇧 <b>${c.esc(it.en)}</b> = 🇫🇷 <b>${c.esc(it.fr)}</b>${also}`;
      return [
        Object.assign({ kind: 'mcq', sub: 'Translate into French', prompt: `<span class="big">🇬🇧 ${c.esc(it.en)}</span>`, explain: ex, speak: { text: it.en, lang: 'en-GB' } }, mk(it.fr, c.distract(it, 3, x => x.fr))),
        Object.assign({ kind: 'mcq', sub: 'Translate into English', prompt: `<span class="big">🇫🇷 ${c.esc(it.fr)}</span>`, explain: ex, speak: fr }, mk(it.en, c.distract(it, 3, x => x.en))),
        { kind: 'type', sub: 'Write this in French', prompt: `<span class="big">🇬🇧 ${c.esc(it.en)}</span>`, answers: [it.fr].concat(it.alt || []), alt: it.alt || [], display: it.fr, explain: ex, lang: 'fr', chars: CHARS },
        { kind: 'type', sub: 'Write this in English', prompt: `<span class="big">🇫🇷 ${c.esc(it.fr)}</span>`, answers: [it.en].concat(it.ealt || []), alt: it.ealt || [], display: it.en, explain: ex, lang: 'en', speak: fr }
      ];
    },
    makeMatch(items) {
      return { kind: 'match', itemId: items[0].id, pairs: items.slice(0, 5).map(it => [it.en, it.fr, it.id]) };
    },
    itemLabel: it => `${it.en} → ${it.fr}`,
    itemDetail: (it, c) => (it.alt && it.alt.length) ? 'also: ' + it.alt.join(', ') : 'Unit: ' + c.units[it._u].title
  });
})();
