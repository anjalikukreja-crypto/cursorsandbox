export interface ConversationItem {
  id: string
  title: string
  category?: string
}

export const conversations: ConversationItem[] = [
  {
    id: '1',
    title: 'Show conversations asking about credit-card interest rates',
    category: 'Lending',
  },
  {
    id: '2',
    title: 'Auto Loan Document Requirements',
    category: 'Auto Loans',
  },
  {
    id: '3',
    title: 'Show conversations asking about reports',
    category: 'Support',
  },
  {
    id: '4',
    title: 'Show conversations asking about Loan rates',
    category: 'Lending',
  },
  {
    id: '5',
    title: "Show Sarah's last call transcript",
    category: 'Member services',
  },
  {
    id: '6',
    title: 'Understanding Credit Unions',
    category: 'Account opening',
  },
]
