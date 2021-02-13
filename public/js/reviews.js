$(".reviewInput").on("keyup", function () {
    if($(this).val()) {
        $(this).siblings(".btn").removeClass("disabled")
        $(this).siblings(".btn").attr("aria-disabled", "false")
    } else {
        $(this).siblings(".btn").addClass("disabled")
        $(this).siblings(".btn").attr("aria-disabled", "true")
    }
});

