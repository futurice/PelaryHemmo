/*
  Includes all the needed graphics together with their width-height ratio.
  Backgrounds, speech bubbles, buttons, moods, activities and others.
*/

import { Map } from 'immutable';

const graphics = Map({
  default_image: Map({
    image: require('../../assets/graphics/others/default-icon.png') }),

  /* backgrounds */
  tausta_perus: Map({
    image: require('../../assets/graphics/backgrounds/tausta_perus.png'),
    ratio: 1.7777 }),
  tausta_perus2: Map({
    image: require('../../assets/graphics/backgrounds/tausta_perus2.png'),
    ratio: 1.7777 }),
  tausta_perus3: Map({
    image: require('../../assets/graphics/backgrounds/tausta_perus3.png'),
    ratio: 1.7777 }),
  tausta_kirjoitus: Map({
    image: require('../../assets/graphics/backgrounds/tausta_kirjoitus.png'),
    ratio: 1.9621 }),
  kirjoituskentta: Map({
    image: require('../../assets/graphics/backgrounds/kirjoituskentta.png'),
    ratio: 1.9638 }),
  kehys_iso: Map({
    image: require('../../assets/graphics/backgrounds/kehys_iso.png'),
    ratio: 0.798 }),
  kehys_keski: Map({
    image: require('../../assets/graphics/backgrounds/kehys_keski.png'),
    ratio: 0.7983 }),
  kehys_pieni: Map({
    image: require('../../assets/graphics/backgrounds/kehys_pieni.png'),
    ratio: 0.7970 }),
  kehys_palkki: Map({
    image: require('../../assets/graphics/backgrounds/kehys_palkki.png'),
    ratio: 4.207 }),
  nelio: Map({
    image: require('../../assets/graphics/backgrounds/nelio.png'),
    ratio: 1.2484 }),
  tausta_asetukset: Map({
    image: require('../../assets/graphics/backgrounds/tausta_asetukset.png'),
    ratio: 2.409 }),
  tausta_hemmolla: Map({
    image: require('../../assets/graphics/backgrounds/tausta_hemmolla.png'),
    ratio: 1.7777 }),
  tausta_kapea: Map({
    image: require('../../assets/graphics/backgrounds/tausta_kapea.png'),
    ratio: 1.1415 }),
  tausta_levea: Map({
    image: require('../../assets/graphics/backgrounds/tausta_levea.png'),
    ratio: 1.7872 }),
  ympyra_iso: Map({
    image: require('../../assets/graphics/backgrounds/ympyra_iso.png'),
    ratio: 1 }),
  ympyra_keski: Map({
    image: require('../../assets/graphics/backgrounds/ympyra_keski.png'),
    ratio: 1 }),
  ympyra_pieni: Map({
    image: require('../../assets/graphics/backgrounds/ympyra_pieni.png'),
    ratio: 1 }),

  /* speech bubbles */
  puhekupla_aset: Map({
    image: require('../../assets/graphics/bubbles/puhekupla_aset.png'),
    ratio: 1.7734 }),
  puhekupla_oikea: Map({
    image: require('../../assets/graphics/bubbles/puhekupla_oikea.png'),
    ratio: 1.6386 }),
  puhekupla_tallennettu: Map({
    image: require('../../assets/graphics/bubbles/puhekupla_tallennettu.png'),
    ratio: 1.6361 }),
  puhekupla_vasen: Map({
    image: require('../../assets/graphics/bubbles/puhekupla_vasen.png'),
    ratio: 1.6361 }),
  puhekupla_vasen2: Map({
    image: require('../../assets/graphics/bubbles/puhekupla_vasen2.png'),
    ratio: 1.1514 }),

  /* buttons */
  nappula_aset: Map({
    image: require('../../assets/graphics/buttons/nappula_aset.png'),
    ratio: 1 }),
  nappula_kirjoita: Map({
    image: require('../../assets/graphics/buttons/nappula_kirjoita.png'),
    ratio: 4.2068 }),
  nappula_ohita: Map({
    image: require('../../assets/graphics/buttons/nappula_ohita.png'),
    ratio: 1.9433 }),
  nappula_rasti: Map({
    image: require('../../assets/graphics/buttons/nappula_rasti.png'),
    ratio: 1 }),
  nappula_rec: Map({
    image: require('../../assets/graphics/buttons/nappula_rec.png'),
    ratio: 1 }),
  nappula_seuraava: Map({
    image: require('../../assets/graphics/buttons/nappula_seuraava.png'),
    ratio: 3.6896 }),
  nappula_seuraava2: Map({
    image: require('../../assets/graphics/buttons/nappula_seuraava2.png'),
    ratio: 1 }),
  nappula_stop: Map({
    image: require('../../assets/graphics/buttons/nappula_stop.png'),
    ratio: 1 }),
  nappula_takaisin: Map({
    image: require('../../assets/graphics/buttons/nappula_takaisin.png'),
    ratio: 0.6301 }),
  nappula_tallenna: Map({
    image: require('../../assets/graphics/buttons/nappula_tallenna.png'),
    ratio: 4.2068 }),
  nappula_uudestaan: Map({
    image: require('../../assets/graphics/buttons/nappula_uudestaan.png'),
    ratio: 1 }),
  nappula_uusikuva: Map({
    image: require('../../assets/graphics/buttons/nappula_uusikuva.png'),
    ratio: 2.6111 }),
  peukku_alas_0: Map({
    image: require('../../assets/graphics/buttons/peukku_alas_0.png'),
    ratio: 1 }),
  peukku_alas_1: Map({
    image: require('../../assets/graphics/buttons/peukku_alas_1.png'),
    ratio: 1 }),
  peukku_keski_0: Map({
    image: require('../../assets/graphics/buttons/peukku_keski_0.png'),
    ratio: 1 }),
  peukku_keski_1: Map({
    image: require('../../assets/graphics/buttons/peukku_keski_1.png'),
    ratio: 1 }),
  peukku_ylos_0: Map({
    image: require('../../assets/graphics/buttons/peukku_ylos_0.png'),
    ratio: 1 }),
  peukku_ylos_1: Map({
    image: require('../../assets/graphics/buttons/peukku_ylos_1.png'),
    ratio: 1 }),

    /* moods */
  iloinen: Map({
    image: require('../../assets/graphics/moods/iloinen.png'),
    ratio: 1 }),
  innostunut: Map({
    image: require('../../assets/graphics/moods/innostunut.png'),
    ratio: 1 }),
  jannittynyt: Map({
    image: require('../../assets/graphics/moods/jannittynyt.png'),
    ratio: 1 }),
  pelokas: Map({
    image: require('../../assets/graphics/moods/pelokas.png'),
    ratio: 1 }),
  rauhallinen: Map({
    image: require('../../assets/graphics/moods/rauhallinen.png'),
    ratio: 1 }),
  surullinen: Map({
    image: require('../../assets/graphics/moods/surullinen.png'),
    ratio: 1 }),
  vihainen: Map({
    image: require('../../assets/graphics/moods/vihainen.png'),
    ratio: 1 }),
  yksinainen: Map({
    image: require('../../assets/graphics/moods/yksinainen.png'),
    ratio: 1 }),
  'muu tunne': Map({
    image: require('../../assets/graphics/moods/muuta.png'),
    ratio: 1 }),

    /* Activities */
  leikimme: Map({
    image: require('../../assets/graphics/activities/leikimme/leikimme.png'),
    ratio: 1.2485 }),
  leikkiminen: Map({
    image: require('../../assets/graphics/activities/leikimme/leikkiminen.png'),
    ratio: 1 }),
  lautapelit: Map({
    image: require('../../assets/graphics/activities/leikimme/lautapelit.png'),
    ratio: 1 }),
  videopelit: Map({
    image: require('../../assets/graphics/activities/leikimme/videopelit.png'),
    ratio: 1 }),
  liikunta: Map({
    image: require('../../assets/graphics/activities/leikimme/liikunta.png'),
    ratio: 1 }),
  uiminen: Map({
    image: require('../../assets/graphics/activities/leikimme/uiminen.png'),
    ratio: 1 }),
  leikimme_muuta: Map({
    image: require('../../assets/graphics/activities/leikimme/leikimme_muuta.png'),
    ratio: 1 }),

  vietimme: Map({
    image: require('../../assets/graphics/activities/vietimme/vietimme.png'),
    ratio: 1.2485 }),
  saunominen: Map({
    image: require('../../assets/graphics/activities/vietimme/saunominen.png'),
    ratio: 1 }),
  juttelu: Map({
    image: require('../../assets/graphics/activities/vietimme/juttelu.png'),
    ratio: 1 }),
  kylaily: Map({
    image: require('../../assets/graphics/activities/vietimme/kylaily.png'),
    ratio: 1 }),
  elokuva: Map({
    image: require('../../assets/graphics/activities/vietimme/elokuva.png'),
    ratio: 1 }),
  kirjat: Map({
    image: require('../../assets/graphics/activities/vietimme/kirjat.png'),
    ratio: 1 }),
  vietimme_muuta: Map({
    image: require('../../assets/graphics/activities/vietimme/vietimme_muuta.png'),
    ratio: 1 }),

  lemmikit: Map({
    image: require('../../assets/graphics/activities/lemmikit/lemmikit.png'),
    ratio: 1.2485 }),
  kissa: Map({
    image: require('../../assets/graphics/activities/lemmikit/kissa.png'),
    ratio: 1 }),
  koira: Map({
    image: require('../../assets/graphics/activities/lemmikit/koira.png'),
    ratio: 1 }),
  hevonen: Map({
    image: require('../../assets/graphics/activities/lemmikit/hevonen.png'),
    ratio: 1 }),
  elaimet_muuta: Map({
    image: require('../../assets/graphics/activities/lemmikit/elaimet_muuta.png'),
    ratio: 1 }),

  puuhasimme: Map({
    image: require('../../assets/graphics/activities/puuhasimme/puuhasimme.png'),
    ratio: 1.2485 }),

  leipominen: Map({
    image: require('../../assets/graphics/activities/puuhasimme/leipominen.png'),
    ratio: 1 }),
  piirtaminen: Map({
    image: require('../../assets/graphics/activities/puuhasimme/piirtaminen.png'),
    ratio: 1 }),
  kotihommia: Map({
    image: require('../../assets/graphics/activities/puuhasimme/kotihommia.png'),
    ratio: 1 }),
  lukeminen: Map({
    image: require('../../assets/graphics/activities/puuhasimme/lukeminen.png'),
    ratio: 1 }),
  rakentaminen: Map({
    image: require('../../assets/graphics/activities/puuhasimme/rakentaminen.png'),
    ratio: 1 }),
  puuhasimme_muuta: Map({
    image: require('../../assets/graphics/activities/puuhasimme/puuhasimme_muuta.png'),
    ratio: 1 }),

  ulkoilimme: Map({
    image: require('../../assets/graphics/activities/ulkoilimme/ulkoilimme.png'),
    ratio: 1.2485 }),

  ulkoilu: Map({
    image: require('../../assets/graphics/activities/ulkoilimme/ulkoilu.png'),
    ratio: 1 }),
  makkaranpaisto: Map({
    image: require('../../assets/graphics/activities/ulkoilimme/makkaranpaisto.png'),
    ratio: 1 }),
  retkeily: Map({
    image: require('../../assets/graphics/activities/ulkoilimme/retkeily.png'),
    ratio: 1 }),
  pihahommat: Map({
    image: require('../../assets/graphics/activities/ulkoilimme/pihahommat.png'),
    ratio: 1 }),
  leikkipuisto: Map({
    image: require('../../assets/graphics/activities/ulkoilimme/leikkipuisto.png'),
    ratio: 1 }),
  kalastaminen: Map({
    image: require('../../assets/graphics/activities/ulkoilimme/kalastaminen.png'),
    ratio: 1 }),
  mokkeily: Map({
    image: require('../../assets/graphics/activities/ulkoilimme/mokkeily.png'),
    ratio: 1 }),
  ulkoilimme_muuta: Map({
    image: require('../../assets/graphics/activities/ulkoilimme/ulkoilimme_muuta.png'),
    ratio: 1 }),

  muuta: Map({
    image: require('../../assets/graphics/activities/muuta.png'),
    ratio: 1 }),

    /* Muuta */
  hemmo_iso: Map({
    image: require('../../assets/graphics/others/hemmo_iso.png'),
    ratio: 0.8878 }),
  hemmo_keski: Map({
    image: require('../../assets/graphics/others/hemmo_keski.png'),
    ratio: 0.8875 }),
  hemmo_pieni: Map({
    image: require('../../assets/graphics/others/hemmo_pieni.png'),
    ratio: 0.8864 }),
  hemmo: Map({
    image: require('../../assets/graphics/others/hemmo.png'),
    ratio: 0.9328 }),
  asetukset: Map({
    image: require('../../assets/graphics/others/asetukset.png'),
    ratio: 6.7903 }),
  lopetusteksti: Map({
    image: require('../../assets/graphics/others/lopetusteksti.png'),
    ratio: 1.0958 }),
  otsake_aset: Map({
    image: require('../../assets/graphics/others/otsake_aset.png'),
    ratio: 5.1164 }),
  valilehti_tyhja: Map({
    image: require('../../assets/graphics/others/valilehti_tyhja.png'),
    ratio: 2.185 }),
  valittu: Map({
    image: require('../../assets/graphics/others/valittu.png'),
    ratio: 1.0377 }),
  ratas: Map({
    image: require('../../assets/graphics/others/ratas.png'),
    ratio: 1 }),
  ikoni_kyna: Map({
    image: require('../../assets/graphics/others/ikoni_kyna.png'),
    ratio: 1 }),
  ikoni_tallenna: Map({
    image: require('../../assets/graphics/others/ikoni_tallenna.png'),
    ratio: 1 }),
});

module.exports = graphics;
