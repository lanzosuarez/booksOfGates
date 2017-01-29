document.ready = (function(){
    var rform = document.getElementById('registerForm');
    var email = document.getElementById('emailRegister');
    var fname = document.getElementById('first_name');
    var lname = document.getElementById('last_name');
    var pass = document.getElementById('pass');
    var c_pass = document.getElementById('confirm_password');

    var textOnlyRegEx = /[0-9\W+]/,
        emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        inputs = document.getElementsByClassName('reg'),
        isInvalid=false;

    function txtTest(field){
        return textOnlyRegEx.test(field)? true:false; 
    }
    function isEqual(f1, f2){
        return f1 === f2 ? true:false;
    }

    fname.addEventListener('focus', function(){
        fname.addEventListener('keyup', function(){
            console.log(txtTest(fname.value))
            if(txtTest(fname.value)){
                fname.classList.add('invalid')
            }else{
                fname.classList.remove('invalid');
                fname.classList.add('valid');
            }
        });   
    });
    

    fname.addEventListener('blur', function(){
        if(fname.value===""){
            fname.classList.remove('invalid');
            fname.classList.remove('valid');
        }else{
            if(txtTest(fname.value)){
            fname.classList.add('invalid')
            }else{
                fname.classList.remove('invalid');
                fname.classList.add('valid');
            }
        }
    });

    lname.addEventListener('focus', function(){
        lname.addEventListener('keyup', function(){
           if(lname.value===""){
                lname.classList.remove('invalid');
                lname.classList.remove('valid');
           }else{
                if(txtTest(lname.value)){
                    lname.classList.add('invalid')
                }else{
                    lname.classList.remove('invalid');
                    lname.classList.add('valid');
                }
           }
        });   
    });
    

    lname.addEventListener('blur', function(){
        if(lname.value===""){
            lname.classList.remove('invalid');
            lname.classList.remove('valid');
        }else{
            if(txtTest(lname.value)){
                lname.classList.add('invalid')
            }else{
                lname.classList.remove('invalid');
                lname.classList.add('valid');
            }
        }
    });

    email.addEventListener('keyup', function(){
        if(email.value===""){
            email.classList.remove('invalid');
            email.classList.remove('valid');
        }else{
            if(!emailRegex.test(email.value)){
                email.classList.add('invalid')
            }else{
                email.classList.remove('invalid');
                email.classList.add('valid');
            }
        }
    });

    function checkEquality(){
        if(!isEqual(pass.value,c_pass.value)){
            console.log("not match")
            c_pass.classList.remove('valid');
            c_pass.classList.add('invalid');
        }
        else{
            if(pass.value===""){
                c_pass.classList.remove('invalid');
                c_pass.classList.remove('valid');
            }else{
                console.log("match")
                c_pass.classList.remove('invalid');
                c_pass.classList.add('valid');
            }  
        } 
    }

    //// CHECK EQUALITY WHEN KEYUP ON PASS FIELD ON PASS FIELD THEN CHECK
    pass.addEventListener('keyup', function(){
        if(c_pass.value){
            checkEquality()
        }
        if(pass.value===""){
            pass.value=null;
        }
    });

    // CHECK EQUALITY WHEN FOCUSED ON PASS FIELD ON PASS FIELD THEN CHECK
    pass.addEventListener('focus', function(){
        if(c_pass.value){
            checkEquality(); 
        }
    });
    // CHECK EQUALITY WHEN FOCUSED ON PASS FIELD ON PASS FIELD THEN CHECK

    pass.addEventListener('focus', function(){
        if(c_pass.value){
            checkEquality(); 
        }
    });
    c_pass.addEventListener('focus', function(){
        if(pass.value){
            c_pass.addEventListener('keyup', function(){
                checkEquality()
            });
        }     
    });
    c_pass.addEventListener('blur', function(){
        if(c_pass.value===""){
            c_pass.classList.remove('invalid');
            c_pass.classList.remove('valid');
        }
       
    });


    //DISABLE REGISTER BUTTON IF THERES AN ERROR IN THE FIELDS
    $.each(inputs, function(index,value){
        $('#'+value.id).attr('required', true);
    });

    $('#registerForm').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            url: '/admin/register',
            type: 'POST',
            data: JSON.stringify({
                username: email.value,
                password: pass.value,
                firstname: fname.value,
                lastname: lname.value,
                c_pass: c_pass.value
            }),
            contentType: 'application/json'
        }).done(function(r){
            if(r.success){
                rform.reset();
                window.location = r.respo
            }
            else{
                var errors="";
                for(var x in r.respo){
                    errors+="-"+r.respo[x]+"\n"
                }
                window.alert(errors);
            }
        })
    });

}());