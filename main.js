$(document).ready(function () {
    var buttonCurrency = $('.dollar-img');
    var fromCurrency = $('.from-currency');
    var toCurrency = $('.to-currency');
    var fromToResult = $('.from-to-result');
    var toToResult = $('.to-to-result');
    var miltiply = 0;
    async function getCurrencies(currencyRecieved) {
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
        const data = await response.json();
        const result = await data;
        const com =  'result.Valute.' + currencyRecieved + '.Value';
        return (eval(com));
    }


    fromCurrency.on('input', async function() {
        fromToResult.attr('placeholder', fromCurrency.val());
        
        if (String(fromCurrency.val()).length == 3) {
            miltiply = await getCurrencies(String(fromCurrency.val()));
            console.log(miltiply);
        }
        
    });

    toCurrency.on('input', function() {
        toToResult.attr('placeholder', toCurrency.val());
    });

    fromToResult.on('input', function() {
        
        if (fromCurrency.val() == '' || toCurrency.val() == '') {
            $('.error').toggleClass('errorOn');
        }
        else {
            toToResult.val((Number(fromToResult.val())*miltiply).toFixed(2));

        
            if (String((Number(fromToResult.val())*miltiply).toFixed(2)).length > 7 || String((Number(toToResult.val())/miltiply).toFixed(2)).length > 7) {
                $('.result-inp').width(180);
            }
            else {
                $('.result-inp').width(115);
            }
        }

        
    });

    toToResult.on('input', function() {
        if (fromCurrency.val() == '' || toCurrency.val() == '') {
            $('.error').toggleClass('errorOn');
        }
        else {
            fromToResult.val((Number(toToResult.val())/miltiply).toFixed(2));
            if (String((Number(fromToResult.val())*miltiply).toFixed(2)).length > 7 || String((Number(toToResult.val())/miltiply).toFixed(2)).length > 7) {
                $('.result-inp').width(180);
            }
            else {
                $('.result-inp').width(115);
            }
        }

        
    });


    
    
});