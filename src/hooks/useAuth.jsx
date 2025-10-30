import { useState, useEffect, useContext, createContext } from 'react';
import { account } from '../lib/appwrite';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const userData = await account.get();
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const userData = await account.get();
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (email, password, name, location, phone, profileImage) => {
    try {
      await account.create('unique()', email, password, name);
      await account.createEmailPasswordSession(email, password);
      const userData = await account.get();
      setUser(userData);

      // Create profile with additional fields
      const { databases, storage } = await import('../lib/appwrite');

      let profileImageUrl = null;
      if (profileImage) {
        const fileId = `profile_${userData.$id}`;
        const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID || 'default';
        const file = await storage.createFile(
          bucketId,
          fileId,
          profileImage
        );
        profileImageUrl = storage.getFileView(bucketId, fileId);
      }

      const profileData = {
        userId: userData.$id,
        name: name,
        bio: '',
        location: location,
        phone: phone,
        profileImageUrl: profileImageUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'profilesdb',
        userData.$id,
        profileData
      );

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
