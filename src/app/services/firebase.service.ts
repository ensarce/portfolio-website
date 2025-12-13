import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app: any;
  private firestore: any;
  private auth: any;

  constructor() {
    // Initialize Firebase
    this.app = initializeApp(environment.firebaseConfig);
    this.firestore = getFirestore(this.app);
    this.auth = getAuth(this.app);
  }

  // Authentication methods
  async login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw error;
    }
  }

  getCurrentUser(): any {
    return this.auth.currentUser;
  }

  // Firestore methods for content management
  async getHomePageContent(): Promise<any> {
    try {
      const docRef = doc(this.firestore, 'content', 'home');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // Return default content if not exists
        return {
          heroTitle: 'Merhaba, Ben Bir Yazılım Geliştiricisiyim',
          heroSubtitle: 'C#, .NET, Angular ve Sağlık Sistemleri alanında uzmanlaşmış bir geliştirici olarak, kullanıcı odaklı çözümler üretiyorum.',
          shortBio: 'Yaklaşık 5 yıldır yazılım geliştirme alanında çalışan bir profesyonel olarak, özellikle sağlık sektöründe entegre sistemler üzerine yoğunlaştım. Geliştirdiğim çözümlerle hastanelerde verimliliği artırmayı ve hasta deneyimini iyileştirmeyi hedefliyorum.'
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async updateHomePageContent(content: any): Promise<void> {
    try {
      const docRef = doc(this.firestore, 'content', 'home');
      await setDoc(docRef, content);
    } catch (error) {
      throw error;
    }
  }

  async getAboutPageContent(): Promise<any> {
    try {
      const docRef = doc(this.firestore, 'content', 'about');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // Return default content if not exists
        return {
          title: 'Hakkımda',
          content: 'Detaylı bilgilerimi burada bulabilirsiniz...',
          imageUrl: 'assets/images/profile.jpg'
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async updateAboutPageContent(content: any): Promise<void> {
    try {
      const docRef = doc(this.firestore, 'content', 'about');
      await setDoc(docRef, content);
    } catch (error) {
      throw error;
    }
  }

  async getContactPageContent(): Promise<any> {
    try {
      const docRef = doc(this.firestore, 'content', 'contact');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // Return default content if not exists
        return {
          title: 'İletişim',
          email: 'email@example.com',
          phone: '+90 555 555 55 55',
          address: 'İstanbul, Türkiye',
          socialLinks: [
            { name: 'LinkedIn', url: '#', icon: 'fab fa-linkedin' },
            { name: 'GitHub', url: '#', icon: 'fab fa-github' },
            { name: 'Twitter', url: '#', icon: 'fab fa-twitter' }
          ]
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async updateContactPageContent(content: any): Promise<void> {
    try {
      const docRef = doc(this.firestore, 'content', 'contact');
      await setDoc(docRef, content);
    } catch (error) {
      throw error;
    }
  }

  // Projects methods
  async getProjects(): Promise<any[]> {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'projects'));
      const projects: any[] = [];
      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() });
      });
      return projects;
    } catch (error) {
      throw error;
    }
  }

  async addProject(project: any): Promise<void> {
    try {
      const docRef = doc(collection(this.firestore, 'projects'));
      await setDoc(docRef, { ...project, id: docRef.id });
    } catch (error) {
      throw error;
    }
  }

  async updateProject(project: any): Promise<void> {
    try {
      const docRef = doc(this.firestore, 'projects', project.id);
      await updateDoc(docRef, project);
    } catch (error) {
      throw error;
    }
  }

  async deleteProject(id: string): Promise<void> {
    try {
      const docRef = doc(this.firestore, 'projects', id);
      await deleteDoc(docRef);
    } catch (error) {
      throw error;
    }
  }

  // Skills methods
  async getSkills(): Promise<any[]> {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'skills'));
      const skills: any[] = [];
      querySnapshot.forEach((doc) => {
        skills.push({ id: doc.id, ...doc.data() });
      });
      return skills;
    } catch (error) {
      throw error;
    }
  }

  async updateSkills(skills: any[]): Promise<void> {
    try {
      // First, delete all existing skills
      const querySnapshot = await getDocs(collection(this.firestore, 'skills'));
      const deletePromises: Promise<void>[] = [];
      querySnapshot.forEach((doc) => {
        deletePromises.push(deleteDoc(doc.ref));
      });
      await Promise.all(deletePromises);

      // Then add new skills
      const addPromises: Promise<void>[] = [];
      skills.forEach(skill => {
        const docRef = doc(collection(this.firestore, 'skills'));
        addPromises.push(setDoc(docRef, { ...skill, id: docRef.id }));
      });
      await Promise.all(addPromises);
    } catch (error) {
      throw error;
    }
  }
}