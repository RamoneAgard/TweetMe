from django.shortcuts import redirect, render
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import  login, logout, authenticate

# Create your views here.

def login_view(request, *args, **kwargs): 
    form = AuthenticationForm(request, data=request.POST or None)
    # form = MyModelForm(request.POST or None)
    if form.is_valid():
        # --for custom auth form use 
        # username = form.cleaned_data.get("username")
        # user_ = authenticate(username, password)
        user_ = form.get_user()
        login(request, user_)
        return redirect("/")
    context = {
        "form": form,
        "btn_label":"Login",
        "title": "Login"
        }
    return render(request, "accounts/auth.html", context)


def register_view(request, *args, **kwargs): 
    form = UserCreationForm(request.POST or None)
    if form.is_valid():
        # print(form.cleaned_data)
        user = form.save(commit=True)
        user.set_password(form.cleaned_data.get("password1"))
        login(request, user)
        return redirect("/")
        # username = form.cleaned_data.get("username")
        # then create user
        # User.objects.create(username=username ...)
    context = {
        "form": form,
        "btn_label":"Register",
        "title": "Register"
        }
    return render(request, "accounts/auth.html", context)

def logout_view(request, *args, **kwargs): 
    if request.method == "POST":
        logout(request)
        return redirect("/login")
    context = {
        "form": None,
        "btn_label":"Click to Confirm",
        "title": "Logout",
        "description": "Are you sure you wish to logout?"
        }
    return render(request, "accounts/auth.html", context)