function hideLoader() {
    const loader = document.getElementById( 'loader' );
    loader.classList.remove( 'loader_active' );
}

function displayRates( data ) {
    const itemsContainer     = document.getElementById( 'items' );
    itemsContainer.innerHTML = '';

    Object.keys( data ).forEach( key => {
        const rate = data[ key ];

        const itemCode  = rate.CharCode;
        const itemValue = rate.Value;

        const item = document.createElement( 'div' );
        item.classList.add( 'item' );

        item.innerHTML = `
      <div class="item__code">${itemCode}</div>
      <div class="item__value">${itemValue}</div>
      <div class="item__currency">руб.</div>
    `;

        itemsContainer.appendChild( item );
    } );
}

function fetchRates() {
    const cachedData    = localStorage.getItem( 'currencyRates' );
    const lastFetchTime = localStorage.getItem( 'lastFetchTime' );

    const currentTime = Date.now();
    if ( cachedData && lastFetchTime && currentTime - lastFetchTime < 3600000 ) {
        displayRates( JSON.parse( cachedData ) );
        hideLoader();
        return;
    }

    fetch( 'https://students.netoservices.ru/nestjs-backend/slow-get-courses' )
        .then( response => response.json() )
        .then( data => {
            const currencyData = data.response.Valute;

            localStorage.setItem( 'currencyRates', JSON.stringify( currencyData ) );
            localStorage.setItem( 'lastFetchTime', currentTime.toString() );

            displayRates( currencyData );
            hideLoader();
        } )
        .catch( error => {
            console.error( 'Ошибка при загрузке данных:', error );
            hideLoader();
        } );
}

document.addEventListener( 'DOMContentLoaded', () => {
    const loader = document.getElementById( 'loader' );
    loader.classList.add( 'loader_active' );

    fetchRates();
} );
