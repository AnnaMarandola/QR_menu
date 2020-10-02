const initialState = {
    restaurants: [
      {id: '1', name: 'Chez Jeannot', adress: '8 rue du chamboule-tout', postalCode: 31200, city: 'Toulouse', phoneContact: '05.21.58.36.99', facebook: 'https://fr-fr.facebook.com/', instagram: 'https://www.instagram.com/?hl=fr', logo: ''},
      {id: '2', name: 'Chez Tatave', adress: '8 rue de la tortue', postalCode: 31200, city: 'Toulouse', phoneContact: '05.21.58.36.99', facebook: 'https://fr-fr.facebook.com/', instagram: 'https://www.instagram.com/?hl=fr', logo: ''},
      {id: '3', name: 'Chez Gino', adress: '8 rue de la tapenade', postalCode: 31200, city: 'Toulouse', phoneContact: '05.21.58.36.99', facebook: 'https://fr-fr.facebook.com/', instagram: 'https://www.instagram.com/?hl=fr', logo: ''}
    ]
};
const authReducer = (state = initialState, action) => {
  return state;
};

export default authReducer;
