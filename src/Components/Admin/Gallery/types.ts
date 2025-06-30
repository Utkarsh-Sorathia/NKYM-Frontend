export interface GalleryItem {
  id: string; // Firestore document ID
  name: string;
  src: string;
  uploaded: string; // formatted date string like "August 08, 2025"
}
