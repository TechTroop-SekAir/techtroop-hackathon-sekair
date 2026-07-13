import { makeAutoObservable, runInAction } from 'mobx';
import { authService } from '../services/authService';
import { userService } from '../services/userService';

class UserStore {
  user = null;
  profile = null;
  createdSurveys = [];
  answeredSurveysCount = 0;

  viewedProfile = null;
  viewedCreatedSurveys = [];
  viewedAnsweredSurveysCount = 0;

  isLoading = true;
  isProfileLoading = false;

  constructor() {
    makeAutoObservable(this);
    this.initializeAuth();
  }

  async initializeAuth() {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        await this.fetchUserProfile(currentUser);
      }
    } 
    catch (error) {
      console.error("Auth initialization failed:", error.message);
    } 
    finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async fetchUserProfile(authUser) {
    try {
      const data = await userService.getUserProfile(authUser.id);

      runInAction(() => {
        this.user = authUser;
        this.profile = data;
      });
    } 
    catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  }

  async fetchProfileDashboardData(targetUserId = null) {
    this.isProfileLoading = true;
    
    const isOwn = !targetUserId || targetUserId === this.user?.id;
    const finalUserId = isOwn ? this.user?.id : targetUserId;

    if (!finalUserId) {
      runInAction(() => { this.isProfileLoading = false; });
      return;
    }
    
    try {
      const promises = [
        userService.getSurveysCreatedByUser(finalUserId),
        userService.getUserVotes(finalUserId)
      ];
      
      if (!isOwn) {
        promises.push(userService.getUserProfile(finalUserId));
      }

      const [surveysData, votesData, externalProfileData] = await Promise.all(promises);

      runInAction(() => {
        const uniqueSurveyIds = new Set(votesData.map(v => v.survey_id));
        const answeredCount = uniqueSurveyIds.size;

        if (isOwn) {
          this.createdSurveys = surveysData;
          this.answeredSurveysCount = answeredCount;
          this.viewedProfile = null;
        }
        else {
          this.viewedCreatedSurveys = surveysData;
          this.viewedAnsweredSurveysCount = answeredCount;
          this.viewedProfile = externalProfileData;
        }
      });
    } 
    catch (error) {
      console.error("Failed to fetch profile dashboard data:", error.message);
    } 
    finally {
      runInAction(() => {
        this.isProfileLoading = false;
      });
    }
  }

  get displayedProfile() {
    return this.viewedProfile || this.profile;
  }

  get displayedCreatedSurveys() {
    return this.viewedProfile ? this.viewedCreatedSurveys : this.createdSurveys;
  }

  get displayedAnsweredSurveysCount() {
    return this.viewedProfile ? this.viewedAnsweredSurveysCount : this.answeredSurveysCount;
  }

  get isViewingOwnProfile() {
    return !this.viewedProfile;
  }


  async login(email, password) {
    runInAction(() => { this.isLoading = true; });
    try {
      const data = await authService.signIn(email, password);
      if (data?.user) {
        await this.fetchUserProfile(data.user);
      }
    } catch (error) {
      throw error;
    } finally {
      runInAction(() => { this.isLoading = false; });
    }
  }


  async register(email, password, fullName) {
    runInAction(() => { this.isLoading = true; });
    try {
      const data = await authService.signUp(email, password, fullName);
      if (data?.user) {
        await authService.signIn(email, password);
        await this.fetchUserProfile(data.user);
      }
    } catch (error) {
      throw error;
    } finally {
      runInAction(() => { this.isLoading = false; });
    }
  }


  async logout() {
    try {
      await authService.signOut();
      runInAction(() => {
        this.user = null;
        this.profile = null;
      });
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  }

  get isAdmin() {
    return this.profile?.role === 'admin';
  }

  get isAuthenticated() {
    return !!this.user;
  }
}

export const userStore = new UserStore();
