# Create new directories if they don't exist
New-Item -ItemType Directory -Force -Path "auth/login"
New-Item -ItemType Directory -Force -Path "auth/signup"
New-Item -ItemType Directory -Force -Path "auth/staff-login"

# Move authentication pages
Move-Item -Path "CustomerLogin/*" -Destination "auth/login/" -Force
Move-Item -Path "SignUp/*" -Destination "auth/signup/" -Force
Move-Item -Path "StaffLogin/*" -Destination "auth/staff-login/" -Force

# Move other pages
Move-Item -Path "Cart" -Destination "cart" -Force
Move-Item -Path "Profile" -Destination "profile" -Force
Move-Item -Path "Wishlist" -Destination "wishlist" -Force
Move-Item -Path "StaffHome" -Destination "staff" -Force
Move-Item -Path "Businesses" -Destination "businesses" -Force
Move-Item -Path "Checkout" -Destination "checkout" -Force
Move-Item -Path "Detail/*" -Destination "products/" -Force

# Remove empty directories
Remove-Item -Path "CustomerLogin" -Force
Remove-Item -Path "SignUp" -Force
Remove-Item -Path "StaffLogin" -Force
Remove-Item -Path "Detail" -Force 