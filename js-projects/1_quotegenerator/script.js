const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// get quote from api
async function getQuote() {
  showLoadingSpinner();
  //   const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://freequote.herokuapp.com/';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // if author is blank add unknown
    if (data.author === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.author;
    }
    // reduce fontsize for long quotes
    if (data.quote.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quote;
    removeLoadingSpinner();
  } catch (error) {
    console.log('whoops, no quote', error);
  }
}

// tweet quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
