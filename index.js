import cheerio from 'cheerio';
import axios from 'axios';

//!
//! Url that is being scrapped
//!
const url = 'https://www.imdb.com/chart/top/?ref_=nv_mv_250';

let movies = [];

//!
//! axios for fetching url 
//!
axios.get(url).then(
     (response) => {

          //!
          //! cheerio for dom scrapping
          //!
          let $ = cheerio.load(response.data);
          $('.lister-list tr').each(function(element, index){
               let url = $(this).find('td.titleColumn a').attr('href');
               let movie = $(this).find('td.titleColumn a').text();
               let releaseYear = $(this).find('td.titleColumn span').text();
               let ratings = $(this).find('td.imdbRating').text().trim();

               movies.push({
                    title: movie,
                    releaseYear: releaseYear,
                    rating: ratings,
                    url: url
               });
          });

          console.log(movies);
     }
).catch((error) => {
     console.log(error);
})