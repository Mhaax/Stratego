let TabComb = (function(){

    function posttab(tab) {
        console.log("pitie");
        $.ajax({
            type: "POST",
            url: "/index/",
            data: {
                login: tab
            },
            success: () => {
                window.location.href = "/game.html";
            },
        });
    }

    return {
        sendtab(tab) {
            posttab(tab);
        }
    }
})();