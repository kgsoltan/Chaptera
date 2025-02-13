import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookGrid from '../components/BookGrid';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getAuthorDetails, getAuthorBooks } from '../services/api';
import { auth } from '../services/firebaseConfig';

function Profile() {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadAuthorData = async () => {
      try {
        const authorDetails = await getAuthorDetails(authorId);
        setAuthor(authorDetails);

        const authorBooks = await getAuthorBooks(authorId);
        setBooks(authorBooks);
      } catch (e) {
        alert('Failed to load author data.');
      }
    };

    loadAuthorData();

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [authorId]);

  if (!author) return <div>Loading...</div>;

  return (
    <div className="profile">
      <img  className="profile-img" src={author.profile_pic_url} alt="Cover Not Found" />
      <h1 className="profile-name">{author.first_name} {author.last_name}'s Profile</h1>
      <p className="profile-bio">{author.bio}</p>
      <h3 className="profile-books-title">{author.first_name}'s books:</h3>

      {books ? <BookGrid books={books} showEditLink={user} /> : <p>You don't have any books!</p>}
    </div>
  );
}

export default Profile;
