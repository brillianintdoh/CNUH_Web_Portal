export function page_3() {
    const addButton = document.getElementById('addButton') as HTMLElement;
    const followingButton = document.getElementById('followingButton') as HTMLElement;
    const followerButton = document.getElementById('followerButton') as HTMLElement;
    const searchArea = document.getElementById('searchArea') as HTMLElement;
    const followingList = document.getElementById('followingList') as HTMLElement;
    const followerList = document.getElementById('followerList') as HTMLElement;

    addButton.addEventListener('click', () => {
        searchArea.style.display = 'block';
        followingList.style.display = 'none';
        followerList.style.display = 'none';
    });
    
    followingButton.addEventListener('click', () => {
        searchArea.style.display = 'none';
        followingList.style.display = 'block';
        followerList.style.display = 'none';
    });
    
    followerButton.addEventListener('click', () => {
        searchArea.style.display = 'none';
        followingList.style.display = 'none';
        followerList.style.display = 'block';
    });
}