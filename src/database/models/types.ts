export interface PlaceStructure {
  _id: string;
  name: string;
  subtitle: string;
  location: string;
  schedule: string;
  otherRelatedPlace: string;
  description: string;
  image: string;
  user: string;
  __v?: number;
}

export interface UserStructure {
  _id: string;
  name: string;
  authId: string;
}
