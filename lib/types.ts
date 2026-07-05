export interface Prize {
  matched_numbers: number;
  matched_stars: number;
  prize: number;
  winners: number;
}

export interface DrawResult {
  date: string;
  draw_id: number;
  has_winner: boolean;
  id: number;
  numbers: string[];
  stars: string[];
  prizes: Prize[];
}
