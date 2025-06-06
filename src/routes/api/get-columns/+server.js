import { json } from '@sveltejs/kit'

export function GET() {
    return json(
        {
            columns: [
                {
                    value: 'linkedin-profile',
                    label: 'LinkedIn Profile',
                },
                {
                    value: 'first-name',
                    label: 'First Name'
                },
                {
                    value: 'last-name',
                    label: 'Last Name'
                },
                {
                    value: 'headline',
                    label: 'Headline'
                },
                {
                    value: 'summary',
                    label: 'Summary'
                }
            ]
        }
    )
}