import { json } from '@sveltejs/kit'

export function GET() {
    return json(
        {
            columns: [
                {
                    value: 'Ersin Karaer',
                    label: 'Full Name'
                },
                {
                    value: 'Ersin',
                    label: 'First Name'
                },
                {
                    value: 'Karaer',
                    label: 'Last Name'
                },
                {
                    value: 'Software Engineer',
                    label: 'Job Title'
                },
                {
                    value: [
                        { label: 'LinkedIn Profile', value: 'https://linkedin.com/in/ersinware' },
                        { label: 'LinkedIn Project Number', value: '13' },
                        { label: 'LinkedIn Experience', value: '3' },
                    ],
                    label: 'LinkedIn'
                }
            ]
        }
    )
}