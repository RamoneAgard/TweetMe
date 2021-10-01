from django.shortcuts import redirect, render
from django.http import Http404

from .models import Profile
from .forms import ProfileForm
# Create your views here.
def profile_detail_view(request, username, *args, **kwargs):
    query_set = Profile.objects.filter(user__username = username)
    if not query_set.exists():
        raise Http404
    profile_obj = query_set.first()
    is_following = False
    if request.user.is_authenticated:
        user = request.user
        is_following = user in profile_obj.followers.all()
        # is_following = profile_obj in user.following.all() -- tad slower
    template_name = "profiles/detail.html"
    context = {
        "profile_username": username,
        "profile": profile_obj,
        "is_following": is_following,
        }
    return render(request, template_name, context)

def profile_update_view(request, *args, **kwargs):
    if not request.user.is_authenticated:
        return redirect("/login?next=profile/update")
    user = request.user
    user_profile = user.profile # becasue of OnetoOne model field
    user_data = {
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'location': user_profile.location,
        'bio': user_profile.bio
    }
    form = ProfileForm(request.POST or None, instance = user_profile, initial = user_data)
    if form.is_valid():
        profile_obj = form.save(commit=False)
        first_name = form.cleaned_data.get("first_name")
        last_name = form.cleaned_data.get("last_name")
        email = form.cleaned_data.get("email")
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.save()
        profile_obj.save()
        return redirect(f"/profile/{user.username}")
        
    template_name = "profiles/form.html"
    context = {
        "form": form,
        "btn_lable": "Save",
        "title": "Update Profile"
    }
    return render(request, template_name, context)