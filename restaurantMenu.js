function setCategoryImages() {
    var urlParams = new URLSearchParams(window.location.search);
    var category = urlParams.get('category');

    var image1, image2,image3,image4,resName1,resName2,resName3,resName4;

    // Set images based on the category
    if (category === 'western'||category==='fastfood') {
        image1 = 'images/western_restaurant1.jpg';
        image2 = 'images/western_restaurant2.jpg';
        image3= 'images/western_restaurant3.jpg';
        image4='images/western_restaurant4.jpg';
        resName1="The Garden of Eat’n";
        resName2="High Street Cafe";
        resName3="Sonny’s Speedy Grill";
        resName4="Fauna Kitchen";
    } else if (category === 'japanese') {
        image1 = 'images/japanese_restaurant1.jpg';
        image2 = 'images/japanese_restaurant2.jpg';
        image3= 'images/japanses_restaurant3.jpg';
        image4='images/western_restaurant4.jpg';
        resName1="Sushi King";
        resName2="Empire Sushi";
        resName3="The Japanese House";
        resName4="Fauna Kitchen";
    } else if (category === 'korean') {
        image1 = 'images/korean_restaurant1.jpg';
        image2 = 'images/korean_restaurant2.jpg';
        // Add more images for the 'korean' category if needed
    }

    // Set the images for the restaurants
    document.getElementById('img1').src = image1;
    document.getElementById('img2').src = image2;
    document.getElementById('img3').src = image3;
    document.getElementById('img4').src = image4;
    document.getElementById('restaurantName1').src = resName1;
    document.getElementById('restaurantName2').src = resName2;
    document.getElementById('restaurantName3').src = resName3;
    document.getElementById('restaurantName4').src = resName4;
}

// Call the function when the page loads
window.onload = setCategoryImages;