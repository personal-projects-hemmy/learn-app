/* English Idioms – content. [idiom, meaning, example (contains the idiom verbatim), French equivalent] */
(function () {
  const U = (title, desc, icon, color, rows) => ({ title, desc, icon, color, items: rows.map(([i, m, x, fr]) => ({ i, m, x, fr })) });
  const blank = it => it.x.replace(new RegExp(it.i.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), '<span class="blank">&nbsp;</span>');
  const explain = it => `<b>${it.i}</b> = ${it.m}<br>“${it.x}”<br>🇫🇷 ${it.fr}`;
  registerCourse({
    id: 'english-idioms', theme: {c:'#8b5cf6',cd:'#6a3fd6',cl:'#f1ebff',acc:'#f59f00',bg:'#faf8ff'},
    desc: 'Everyday English idioms: meanings, examples and French equivalents.', itemNoun: 'idioms', lang: 'en', name: 'English Idioms', short: 'Idioms', logo: '💬', mascot: '🦉',
    lessonsPerUnit: 3, lessonSize: 9, finalSize: 10, perItem: 2, defaultGoal: 20,
    footer: 'Tap 🔊 to hear an idiom. Idioms are informal: use them in conversation more than in formal writing.',
    units: [
      U('Feelings & Mood', 'Happy, sad, nervous, angry', '😊', '#8b5cf6', [
        ['over the moon', 'extremely happy', 'She was over the moon when she got the job.', 'être aux anges'],
        ['under the weather', 'slightly ill', 'I\'m a bit under the weather today, so I\'ll stay home.', 'être patraque'],
        ['green with envy', 'very jealous', 'He was green with envy when he saw my new car.', 'vert de jalousie'],
        ['down in the dumps', 'sad and depressed', 'You look down in the dumps. What\'s wrong?', 'avoir le cafard'],
        ['get cold feet', 'become too nervous to do something planned', 'He started to get cold feet the night before the wedding.', 'se dégonfler'],
        ['a bundle of nerves', 'a very nervous person', 'Before the exam I was a bundle of nerves.', 'une boule de nerfs'],
        ['fly off the handle', 'suddenly become very angry', 'Don\'t fly off the handle; it was just a mistake.', 'sortir de ses gonds'],
        ['keep your chin up', 'stay positive in hard times', 'Keep your chin up — things will get better.', 'garder le moral'],
        ['a heart of gold', 'a very kind nature', 'My grandmother has a heart of gold.', 'un cœur d\'or'],
        ['let off steam', 'release strong feelings or energy', 'I go running after work to let off steam.', 'se défouler']
      ]),
      U('Work & Effort', 'At the office and at school', '💼', '#2f9e44', [
        ['burn the midnight oil', 'work late into the night', 'I had to burn the midnight oil to finish the report.', 'travailler tard dans la nuit'],
        ['go the extra mile', 'make more effort than expected', 'Our team always tries to go the extra mile for clients.', 'se donner à fond, en faire plus'],
        ['pull your weight', 'do your fair share of the work', 'If you don\'t pull your weight, the project will fail.', 'faire sa part du travail'],
        ['cut corners', 'do something badly to save time or money', 'Never cut corners on safety.', 'bâcler le travail'],
        ['back to the drawing board', 'time to start again after a failure', 'The client hated it, so it\'s back to the drawing board.', 'retour à la case départ'],
        ['learn the ropes', 'learn how to do a new job', 'It takes a few weeks to learn the ropes here.', 'apprendre les ficelles du métier'],
        ['call it a day', 'stop working for today', 'It\'s 7 p.m. — let\'s call it a day.', 's\'arrêter là pour aujourd\'hui'],
        ['hit the ground running', 'start something quickly and well', 'The new manager wants to hit the ground running.', 'démarrer sur les chapeaux de roue'],
        ['think outside the box', 'think in a creative, original way', 'We need to think outside the box to solve this.', 'sortir des sentiers battus'],
        ['on the same page', 'agreeing and understanding the same thing', 'Let\'s meet to make sure we\'re on the same page.', 'sur la même longueur d\'onde']
      ]),
      U('Money & Time', 'Spending, saving and timing', '⏰', '#e67700', [
        ['cost an arm and a leg', 'be very expensive', 'That new phone will cost an arm and a leg.', 'coûter les yeux de la tête'],
        ['make ends meet', 'have just enough money to live', 'It\'s hard to make ends meet on one salary.', 'joindre les deux bouts'],
        ['tighten your belt', 'spend less money than before', 'If prices keep rising, you\'ll have to tighten your belt.', 'se serrer la ceinture'],
        ['save for a rainy day', 'keep money for future problems', 'It\'s wise to save for a rainy day.', 'garder une poire pour la soif'],
        ['once in a blue moon', 'very rarely', 'I only eat fast food once in a blue moon.', 'tous les trente-six du mois'],
        ['in the nick of time', 'at the very last moment', 'We reached the station in the nick of time.', 'juste à temps, in extremis'],
        ['better late than never', 'doing it late beats not doing it', 'You finally replied — better late than never!', 'mieux vaut tard que jamais'],
        ['time flies', 'time passes very quickly', 'Time flies when you\'re having fun.', 'le temps passe vite'],
        ['at the drop of a hat', 'immediately, without hesitating', 'She would travel anywhere at the drop of a hat.', 'sans hésiter, au quart de tour'],
        ['around the clock', 'all day and all night', 'Nurses in this hospital work around the clock.', '24 heures sur 24']
      ]),
      U('Talk & Secrets', 'Communication and secrets', '🤫', '#1c7ed6', [
        ['spill the beans', 'tell secret information', 'Come on, spill the beans! Who is she?', 'cracher le morceau'],
        ['pick your brain', 'ask you for ideas or advice', 'Can I pick your brain about marketing?', 'demander conseil à quelqu\'un'],
        ['beat around the bush', 'avoid saying something directly', 'Don\'t beat around the bush — just tell me.', 'tourner autour du pot'],
        ['hit the nail on the head', 'describe something exactly right', 'You hit the nail on the head with that comment.', 'mettre le doigt dessus'],
        ['break the ice', 'help people relax when they first meet', 'A funny game can help break the ice.', 'briser la glace'],
        ['keep it under your hat', 'keep it secret', 'I\'m changing jobs, but keep it under your hat.', 'garder ça pour soi'],
        ['word of mouth', 'people telling each other', 'The restaurant became popular by word of mouth.', 'le bouche-à-oreille'],
        ['speak your mind', 'say honestly what you think', 'Feel free to speak your mind in the meeting.', 'dire ce qu\'on pense'],
        ['get the wrong end of the stick', 'misunderstand something', 'Don\'t get the wrong end of the stick — I wasn\'t criticising you.', 'comprendre de travers'],
        ['straight from the horse\'s mouth', 'directly from the original source', 'I heard it straight from the horse\'s mouth: the boss is leaving.', 'de source sûre']
      ]),
      U('Problems & Challenges', 'Easy, hard and in trouble', '🧗', '#e03131', [
        ['a piece of cake', 'something very easy', 'The driving test was a piece of cake.', 'c\'est du gâteau'],
        ['in hot water', 'in trouble', 'He\'s in hot water for missing the deadline.', 'dans le pétrin'],
        ['bite off more than you can chew', 'take on more than you can handle', 'Don\'t bite off more than you can chew this term.', 'avoir les yeux plus gros que le ventre'],
        ['the last straw', 'the final problem that makes you lose patience', 'Being late again was the last straw.', 'la goutte d\'eau qui fait déborder le vase'],
        ['a blessing in disguise', 'a bad thing that turns out to be good', 'Missing that train was a blessing in disguise.', 'un mal pour un bien'],
        ['between a rock and a hard place', 'facing two bad choices', 'I\'m between a rock and a hard place: both options are bad.', 'entre le marteau et l\'enclume'],
        ['cross that bridge when we come to it', 'deal with a problem only if it happens', 'Let\'s not worry yet; we\'ll cross that bridge when we come to it.', 'chaque chose en son temps'],
        ['a storm in a teacup', 'a big fuss about something small', 'Their argument was just a storm in a teacup.', 'une tempête dans un verre d\'eau'],
        ['bite the bullet', 'force yourself to do something unpleasant', 'I hate the dentist, but I\'ll bite the bullet and go.', 'serrer les dents'],
        ['jump through hoops', 'go through many complicated steps', 'We had to jump through hoops to get a visa.', 'passer par mille formalités']
      ]),
      U('Luck & Wisdom', 'Success, luck and proverbs', '🍀', '#0ca678', [
        ['break a leg', 'good luck (before a performance)', 'Break a leg in your show tonight!', 'merde ! (bonne chance)'],
        ['hit the jackpot', 'have sudden great luck or success', 'We hit the jackpot with this apartment.', 'décrocher le gros lot'],
        ['the ball is in your court', 'it is your turn to decide or act', 'I\'ve made my offer; the ball is in your court.', 'la balle est dans ton camp'],
        ['kill two birds with one stone', 'achieve two things with one action', 'I\'ll kill two birds with one stone and shop on the way home.', 'faire d\'une pierre deux coups'],
        ['once bitten, twice shy', 'a bad experience makes you careful', 'I won\'t lend him money again — once bitten, twice shy.', 'chat échaudé craint l\'eau froide'],
        ['the best of both worlds', 'the advantages of two things at once', 'Working from home gives me the best of both worlds.', 'le meilleur des deux mondes'],
        ['practice makes perfect', 'doing something often makes you good at it', 'Keep going: practice makes perfect.', 'c\'est en forgeant qu\'on devient forgeron'],
        ['the early bird catches the worm', 'people who act early succeed', 'Get there at 8 a.m.: the early bird catches the worm.', 'l\'avenir appartient à ceux qui se lèvent tôt'],
        ['actions speak louder than words', 'what you do matters more than what you say', 'Don\'t just promise; actions speak louder than words.', 'les actes valent mieux que les paroles'],
        ['don\'t count your chickens before they hatch', 'don\'t assume success too early', 'You haven\'t got the job yet — don\'t count your chickens before they hatch.', 'il ne faut pas vendre la peau de l\'ours avant de l\'avoir tué']
      ])
    ],
    makeExercises(it, c) {
      const say = { text: it.i, lang: 'en-GB' };
      const mk = (correct, others) => { const o = c.shuffle([correct].concat(others)); return { options: o, correct: o.indexOf(correct) }; };
      const a = mk(it.m, c.distract(it, 3, x => x.m));
      const b = mk(it.i, c.distract(it, 3, x => x.i));
      const d = mk(it.i, c.distract(it, 3, x => x.i));
      return [
        Object.assign({ kind: 'mcq', sub: 'What does this idiom mean?', prompt: `<span class="big">“${c.esc(it.i)}”</span>`, explain: explain(it), speak: say }, a),
        Object.assign({ kind: 'mcq', sub: 'Which idiom means…', prompt: `<span class="big" style="font-size:22px">${c.esc(it.m)}</span>`, explain: explain(it) }, b),
        Object.assign({ kind: 'mcq', sub: 'Fill in the blank', prompt: `<span class="sent">${blank(it)}</span>`, explain: explain(it), speak: { text: it.x, lang: 'en-GB' } }, d)
      ];
    },
    makeMatch(items) {
      return { kind: 'match', itemId: items[0].id, pairs: items.slice(0, 4).map(it => [it.i, it.m, it.id]), explain: '' };
    },
    itemLabel: it => it.i,
    itemDetail: it => it.m + ' · 🇫🇷 ' + it.fr
  });
})();
