/** Define all your images here */
const images = {};
// to attached images on each source
const attach = (name, icon, width, height, source) => {
  if (!images[ name ]) {
    images[ name ] = {};
  }
  images[ name ][ icon ] = {
    width,
    height,
    source,
  };
};

/**
 * Define all the images here
 * ex. attach('menu', 'logo', 23, 20, require('./images/...'))
 * */
// attach('common', 'user', 85, 84, require('./images/user.png'));

export default images;
