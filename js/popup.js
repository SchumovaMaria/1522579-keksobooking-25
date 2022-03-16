import {createCards} from './data.js';

const TYPES = [
  {flat: 'Квартира'},
  {bungalow: 'Бунгало'},
  {house: 'Дом'},
  {palace: 'Дворец'},
  {hotel: 'Отель'}
];

const map = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarCards = createCards();

const similarListFragment = document.createDocumentFragment();

similarCards.forEach(({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementPhotoContainer = cardElement.querySelector('.popup__photos');
  const cardElementPhotoTemplate = cardElement.querySelector('.popup__photo');
  cardElementPhotoContainer.textContent = '';
  const cardElementChildren = cardElement.children;
  const cardElementChildrenArray = Array.from(cardElementChildren);

  cardElement.querySelector('.popup__title').textContent = offer.title;

  cardElement.querySelector('.popup__text--address').textContent = offer.address;

  cardElement.querySelector('.popup__text--price').textContent =  `${offer.price ? offer.price : 'Данные не найдены.'} ₽/ночь`;

  cardElement.querySelector('.popup__type').textContent = TYPES.find((type) => Object.keys(type).includes(offer.type))[offer.type];

  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms ? offer.rooms : 'Данные не найдены.'} комнаты для ${offer.guests ? offer.guests : 'Данные не найдены.'} гостей`;

  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin ? offer.checkin : 'Данные не найдены.'}, выезд до ${offer.checkout ? offer.checkout : 'Данные не найдены.'}`;

  cardElement.querySelector('.popup__features').textContent = offer.features.join(', ');

  cardElement.querySelector('.popup__description').textContent = offer.description;

  offer.photos.forEach((photo) => {
    const photoElement = cardElementPhotoTemplate.cloneNode();
    photoElement.src = photo;
    cardElementPhotoContainer.append(photoElement);
  });

  cardElement.querySelector('.popup__avatar').src = author.avatar;

  cardElementChildrenArray.forEach((child) => {
    if (child.textContent.includes('Данные не найдены.') || (!child.textContent && !child.src && child.children.length === 0)) {
      const childClasses = Array.from(child.classList).join('.');
      const notNecessaryChild = cardElement.querySelector(`.${childClasses}`);
      notNecessaryChild.classList.add('hidden');
    }
  });

  similarListFragment.appendChild(cardElement);
});

map.appendChild(similarListFragment.firstElementChild);
