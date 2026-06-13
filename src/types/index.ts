export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  completionDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string | null;
  rating: number;
  createdAt: string;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  phone: string;
  vehicleType: string;
  description: string;
  budget: string;
  city: string;
  status: "PENDING" | "CONTACTED" | "COMPLETED";
  createdAt: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string | null;
  createdAt: string;
}

export interface SiteContent {
  id: string;
  key: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "ADMIN" | "USER";
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  createdAt: string;
}
