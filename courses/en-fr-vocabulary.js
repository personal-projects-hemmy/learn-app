/* EN/FR Vocabulary – content. [english, french, extra accepted FR answers (|), extra accepted EN answers (|)] */
(function () {
  const U = (title, desc, icon, color, rows) => ({ title, desc, icon, color, items: rows.map(([en, fr, fa, ea]) => ({ en, fr, fa: fa ? fa.split('|') : [], ea: ea ? ea.split('|') : [] })) });
  const CHARS = ['é', 'è', 'ê', 'à', 'â', 'ç', 'î', 'ô', 'û', 'ù', 'œ', "'"];
  registerCourse({
    id: 'en-fr-vocabulary', theme: {c:'#58cc02',cd:'#46a302',cl:'#e7f9d7',acc:'#1cb0f6',bg:'#f7fbf3'},
    desc: 'English ⇄ French words: translate, type and match.', itemNoun: 'words', lang: 'en', name: 'EN/FR Vocabulary', short: 'EN ⇄ FR', logo: '🇫🇷', mascot: '🥐',
    lessonsPerUnit: 3, lessonSize: 10, finalSize: 12, perItem: 2, defaultGoal: 20,
    footer: 'Tip: when typing French, accents are checked gently: you\'ll get a reminder if one is missing.',
    units: [
      U('Basics', 'Greetings and polite words', '👋', '#58cc02', [
        ['hello', 'bonjour', 'salut', 'hi|good morning'], ['goodbye', 'au revoir', '', 'bye'], ['please', 's\'il vous plaît', 's\'il te plaît'], ['thank you', 'merci', '', 'thanks'],
        ['yes', 'oui'], ['no', 'non'], ['sorry', 'désolé', 'désolée|pardon'], ['excuse me', 'excusez-moi', 'pardon|excuse-moi'],
        ['good evening', 'bonsoir'], ['good night', 'bonne nuit'], ['see you soon', 'à bientôt'], ['welcome', 'bienvenue'],
        ['how are you?', 'comment allez-vous ?', 'comment vas-tu|ça va'], ['my name is', 'je m\'appelle'], ['friend', 'l\'ami', 'ami|amie|copain|copine']
      ]),
      U('Food & Drink', 'At the table and the market', '🥖', '#ff9600', [
        ['bread', 'le pain'], ['water', 'l\'eau'], ['apple', 'la pomme'], ['cheese', 'le fromage'], ['milk', 'le lait'],
        ['egg', 'l\'œuf'], ['meat', 'la viande'], ['fish', 'le poisson'], ['chicken', 'le poulet'], ['rice', 'le riz'],
        ['vegetable', 'le légume'], ['sugar', 'le sucre'], ['coffee', 'le café'], ['wine', 'le vin'], ['breakfast', 'le petit-déjeuner', 'petit déjeuner']
      ]),
      U('Home', 'Rooms and things in the house', '🏠', '#1cb0f6', [
        ['house', 'la maison'], ['kitchen', 'la cuisine'], ['bedroom', 'la chambre'], ['bathroom', 'la salle de bain', 'salle de bains'], ['door', 'la porte'],
        ['window', 'la fenêtre'], ['chair', 'la chaise'], ['bed', 'le lit'], ['key', 'la clé', 'clef'], ['roof', 'le toit'],
        ['wall', 'le mur'], ['garden', 'le jardin'], ['stairs', 'l\'escalier', 'escaliers', 'staircase'], ['sofa', 'le canapé', '', 'couch'], ['mirror', 'le miroir', 'glace']
      ]),
      U('Family & People', 'Relatives and people around you', '👨‍👩‍👧', '#ce82ff', [
        ['mother', 'la mère', 'maman', 'mum|mom'], ['father', 'le père', 'papa', 'dad'], ['sister', 'la sœur'], ['brother', 'le frère'], ['son', 'le fils'],
        ['daughter', 'la fille', '', 'girl'], ['grandmother', 'la grand-mère', 'mamie', 'grandma'], ['grandfather', 'le grand-père', 'papi', 'grandpa'], ['uncle', 'l\'oncle'], ['aunt', 'la tante'],
        ['husband', 'le mari', 'époux'], ['wife', 'la femme', 'épouse', 'woman'], ['child', 'l\'enfant', '', 'kid'], ['baby', 'le bébé'], ['neighbour', 'le voisin', 'voisine', 'neighbor']
      ]),
      U('Body & Health', 'Parts of the body, at the doctor', '🩺', '#ff4b4b', [
        ['head', 'la tête'], ['hand', 'la main'], ['foot', 'le pied'], ['eye', 'l\'œil'], ['mouth', 'la bouche'],
        ['nose', 'le nez'], ['ear', 'l\'oreille'], ['arm', 'le bras'], ['leg', 'la jambe'], ['heart', 'le cœur'],
        ['tooth', 'la dent'], ['back', 'le dos'], ['doctor', 'le médecin', 'docteur'], ['hospital', 'l\'hôpital'], ['medicine', 'le médicament', 'médicaments', 'medication|drug']
      ]),
      U('Travel & City', 'Getting around town', '🚆', '#2b70c9', [
        ['car', 'la voiture'], ['train station', 'la gare', '', 'station|railway station'], ['plane', 'l\'avion', '', 'airplane|aeroplane'], ['street', 'la rue'], ['ticket', 'le billet', 'ticket'],
        ['airport', 'l\'aéroport'], ['bridge', 'le pont'], ['town', 'la ville', '', 'city'], ['map', 'la carte', 'plan'], ['bicycle', 'le vélo', 'bicyclette', 'bike'],
        ['hotel', 'l\'hôtel'], ['on the left', 'à gauche', 'gauche', 'left'], ['on the right', 'à droite', 'droite', 'right'], ['straight ahead', 'tout droit', '', 'straight on'], ['luggage', 'les bagages', 'bagage', 'baggage|bags']
      ]),
      U('Work & School', 'Office, classroom and studies', '🎒', '#a5560f', [
        ['work', 'le travail', 'boulot', 'job'], ['office', 'le bureau'], ['teacher', 'le professeur', 'prof|enseignant|enseignante|professeure'], ['student', 'l\'étudiant', 'étudiante|élève'], ['book', 'le livre'],
        ['pen', 'le stylo'], ['meeting', 'la réunion'], ['boss', 'le patron', 'patronne|chef'], ['computer', 'l\'ordinateur'], ['homework', 'les devoirs'],
        ['lesson', 'la leçon', 'cours'], ['exam', 'l\'examen'], ['salary', 'le salaire', '', 'wage|pay'], ['colleague', 'le collègue', 'collègue'], ['school', 'l\'école']
      ]),
      U('Nature & Weather', 'Outdoors and the forecast', '🌦️', '#00a896', [
        ['sun', 'le soleil'], ['rain', 'la pluie'], ['snow', 'la neige'], ['wind', 'le vent'], ['cloud', 'le nuage'],
        ['tree', 'l\'arbre'], ['flower', 'la fleur'], ['sea', 'la mer'], ['mountain', 'la montagne'], ['river', 'la rivière', 'fleuve'],
        ['sky', 'le ciel'], ['weather', 'le temps', 'météo'], ['hot', 'chaud', 'chaude'], ['cold', 'froid', 'froide'], ['forest', 'la forêt', 'bois']
      ])
    ],
    makeExercises(it, c) {
      const fr = { text: it.fr, lang: 'fr-FR' };
      const mk = (correct, others) => { const o = c.shuffle([correct].concat(others)); return { options: o, correct: o.indexOf(correct) }; };
      const ex = `🇬🇧 <b>${c.esc(it.en)}</b> = 🇫🇷 <b>${c.esc(it.fr)}</b>`;
      return [
        Object.assign({ kind: 'mcq', sub: 'Translate into French', prompt: `<span class="big">🇬🇧 ${c.esc(it.en)}</span>`, explain: ex, speak: { text: it.en, lang: 'en-GB' } }, mk(it.fr, c.distract(it, 3, x => x.fr))),
        Object.assign({ kind: 'mcq', sub: 'Translate into English', prompt: `<span class="big">🇫🇷 ${c.esc(it.fr)}</span>`, explain: ex, speak: fr }, mk(it.en, c.distract(it, 3, x => x.en))),
        { kind: 'type', sub: 'Write this in French', prompt: `<span class="big">🇬🇧 ${c.esc(it.en)}</span>`, answers: [it.fr].concat(it.fa), display: it.fr, explain: ex, lang: 'fr', chars: CHARS },
        { kind: 'type', sub: 'Write this in English', prompt: `<span class="big">🇫🇷 ${c.esc(it.fr)}</span>`, answers: [it.en].concat(it.ea), display: it.en, explain: ex, lang: 'en', speak: fr }
      ];
    },
    makeMatch(items) {
      return { kind: 'match', itemId: items[0].id, pairs: items.slice(0, 5).map(it => [it.en, it.fr, it.id]) };
    },
    itemLabel: it => `${it.en} → ${it.fr}`,
    itemDetail: (it, c) => it.fa.length ? 'also: ' + it.fa.join(', ') : 'Unit: ' + c.units[it._u].title
  });
})();
