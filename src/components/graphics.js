import {Map} from 'immutable';
import {
  Dimensions
} from 'react-native';

var graphics = Map({
  'screen_width': Dimensions.get('window').width,
  'screen_height': Dimensions.get('window').height,
  'default_image': Map({
    image: require('../../assets/default-icon.png')}),

  /* backgrounds */
  'tausta_perus2': Map({
    image: require('../../assets/graphics/backgrounds/tausta_perus2.png'),
    ratio: 1.7777}),
  'tausta_perus': Map({
    image: require('../../assets/graphics/backgrounds/tausta_perus.png'),
    ratio: 1.7777}),
  'kehys_iso': Map({
    image: require('../../assets/graphics/backgrounds/kehys_iso.png'),
    ratio: 0.798}),
  'kehys_keski': Map({
    image: require('../../assets/graphics/backgrounds/kehys_keski.png'),
    ratio: 0.7983}),
  'kehys_pieni': Map({
    image: require('../../assets/graphics/backgrounds/kehys_pieni.png'),
    ratio: 0.7970}),
  'nelio': Map({
    image: require('../../assets/graphics/backgrounds/nelio.png'),
    ratio: 1.2484}),
  'tausta_asetukset': Map({
    image: require('../../assets/graphics/backgrounds/tausta_asetukset.png'),
    ratio: 2.1582}),
  'tausta_hemmolla': Map({
    image: require('../../assets/graphics/backgrounds/tausta_hemmolla.png'),
    ratio: 1.7777}),
  'tausta_kapea': Map({
    image: require('../../assets/graphics/backgrounds/tausta_kapea.png'),
    ratio: 1.1415}),
  'tausta_levea': Map({
    image: require('../../assets/graphics/backgrounds/tausta_levea.png'),
    ratio: 1.7872}),
  'ympyra_iso': Map({
    image: require('../../assets/graphics/backgrounds/ympyra_iso.png'),
    ratio: 1}),
  'ympyra_keski': Map({
    image: require('../../assets/graphics/backgrounds/ympyra_keski.png'),
    ratio: 1}),
  'ympyra_pieni': Map({
    image: require('../../assets/graphics/backgrounds/ympyra_pieni.png'),
    ratio: 1}),

  /* speech bubbles */
  'puhekupla_aset': Map({
    image: require('../../assets/graphics/bubbles/puhekupla_aset.png'),
    ratio: 1.7734}),
  'puhekupla_oikea': Map({
    image: require('../../assets/graphics/bubbles/puhekupla_oikea.png'),
    ratio: 1.6386}),
  'puhekupla_tallennettu': Map({
    image: require('../../assets/graphics/bubbles/puhekupla_tallennettu.png'),
    ratio: 1.6361}),
  'puhekupla_vasen': Map({
    image: require('../../assets/graphics/bubbles/puhekupla_vasen.png'),
    ratio: 1.6361}),
  'puhekupla_vasen2': Map({
    image: require('../../assets/graphics/bubbles/puhekupla_vasen2.png'),
    ratio: 1.1514}),

  /* buttons */
  'nappula_aset': Map({
    image: require('../../assets/graphics/buttons/nappula_aset.png'),
    ratio: 1}),
  'nappula_kirjoita': Map({
    image: require('../../assets/graphics/buttons/nappula_kirjoita.png'),
    ratio: 4.2068}),
  'nappula_ohita': Map({
    image: require('../../assets/graphics/buttons/nappula_ohita.png'),
    ratio: 1.9433}),
  'nappula_rasti': Map({
    image: require('../../assets/graphics/buttons/nappula_rasti.png'),
    ratio: 1}),
  'nappula_rec': Map({
    image: require('../../assets/graphics/buttons/nappula_rec.png'),
    ratio: 1}),
  'nappula_seuraava': Map({
    image: require('../../assets/graphics/buttons/nappula_seuraava.png'),
    ratio: 3.6896}),
  'nappula_seuraava2': Map({
    image: require('../../assets/graphics/buttons/nappula_seuraava2.png'),
    ratio: 1}),
  'nappula_stop': Map({
    image: require('../../assets/graphics/buttons/nappula_stop.png'),
    ratio: 1}),
  'nappula_takaisin': Map({
    image: require('../../assets/graphics/buttons/nappula_takaisin.png'),
    ratio: 0.6301}),
  'nappula_tallenna': Map({
    image: require('../../assets/graphics/buttons/nappula_tallenna.png'),
    ratio: 4.2068}),
  'nappula_uudestaan': Map({
    image: require('../../assets/graphics/buttons/nappula_uudestaan.png'),
    ratio: 1}),
  'nappula_uusikuva': Map({
    image: require('../../assets/graphics/buttons/nappula_uusikuva.png'),
    ratio: 2.6111}),

  'hemmo_iso': Map({
    image: require('../../assets/graphics/others/hemmo_iso.png'),
    ratio: 0.8878}),
  'hemmo_keski': Map({
    image: require('../../assets/graphics/others/hemmo_keski.png'),
    ratio: 0.8875}),
  'hemmo_pieni': Map({
    image: require('../../assets/graphics/others/hemmo_pieni.png'),
    ratio: 0.8864}),
  'lopetusteksti': Map({
    image: require('../../assets/graphics/others/lopetusteksti.png'),
    ratio: 1.0958}),
  'otsake_aset': Map({
    image: require('../../assets/graphics/others/otsake_aset.png'),
    ratio: 5.1164}),
  'valilehti_lisaa': Map({
    image: require('../../assets/graphics/others/valilehti_lisaa.png'),
    ratio: 3.5490}),
  'valilehti_tyhja': Map({
    image: require('../../assets/graphics/others/valilehti_tyhja.png'),
    ratio: 3.5490}),
  'valittu': Map({
    image: require('../../assets/graphics/others/valittu.png'),
    ratio: 1.0377})
});

module.exports = graphics;