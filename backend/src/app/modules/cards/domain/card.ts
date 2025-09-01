export class Card {
  constructor(
    public readonly id: string,
    public readonly fullName: string,
    public readonly title: string,
    public readonly email: string,
    public readonly socialMedia: string,
    public readonly phoneNumber: string | null,
    public readonly description: string | null,
    public readonly userId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
