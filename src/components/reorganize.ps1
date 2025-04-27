# Move authentication components
Move-Item -Path "LoginForm.tsx" -Destination "auth/"
Move-Item -Path "LoginModal.tsx" -Destination "auth/"
Move-Item -Path "SignUpForm.tsx" -Destination "auth/"
Move-Item -Path "LogOutButton.tsx" -Destination "auth/"

# Move product-related components
Move-Item -Path "ItemCard.tsx" -Destination "product/"
Move-Item -Path "ListItem.tsx" -Destination "product/"
Move-Item -Path "FilterBar.tsx" -Destination "product/"
Move-Item -Path "OptionBar.tsx" -Destination "product/"
Move-Item -Path "RecommendItem.tsx" -Destination "product/"
Move-Item -Path "RecommendList.tsx" -Destination "product/"

# Move cart-related components
Move-Item -Path "CartItem.tsx" -Destination "cart/"
Move-Item -Path "CartItemList.tsx" -Destination "cart/"
Move-Item -Path "CartOptionsModal.tsx" -Destination "cart/"
Move-Item -Path "CheckOutModal.tsx" -Destination "cart/"

# Move feedback components
Move-Item -Path "Comment.tsx" -Destination "ui/feedback/"
Move-Item -Path "CommentsList.tsx" -Destination "ui/feedback/"
Move-Item -Path "ReviewsSection.tsx" -Destination "ui/feedback/"

# Move navigation components
Move-Item -Path "Navbar.tsx" -Destination "ui/navigation/"
Move-Item -Path "PaginationControl.tsx" -Destination "ui/navigation/"

# Move common UI components
Move-Item -Path "ProfileCard.tsx" -Destination "ui/common/"
Move-Item -Path "WishListWrapper.tsx" -Destination "ui/common/" 