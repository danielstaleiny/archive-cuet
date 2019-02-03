const { addQuery, parseAttachmentInfo, sizeParse } = require('./helpers')

describe('helpers.js', () => {
    describe('addQuery', () => {
        test('test object in, string out', () => {
            expect(addQuery({ first: '1', second: '2', third: '3' })).toBe(
                '?first=1&second=2&third=3'
            )
        })
        test('test 1 value', () => {
            expect(addQuery({ first: '1' })).toBe('?first=1')
        })
        test('test empty object', () => {
            expect(addQuery({})).toBe('')
        })
        test('test no value', () => {
            expect(addQuery()).toBe('')
        })
    })

    describe('parseAttachmentInfo', () => {
        test('pdf test', () => {
            expect(
                parseAttachmentInfo(
                    '<img src="/Content/Img/pdf.png" alt="file icon: application/pdf">                    450.9 kB'
                )
            ).toEqual({
                mimeType: 'application/pdf',
                fileSize: '450.9 kB'
            })
        })

        test('pdf test', () => {
            expect(
                parseAttachmentInfo(
                    '<img src="/Content/Img/doc.png" alt="file icon: application/vnd.openxmlformats-officedocument.wordprocessingml.document">105.7 kB'
                )
            ).toEqual({
                mimeType:
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                fileSize: '105.7 kB'
            })
        })
    })

    describe('sizeParse', () => {
        test('test', () => {
            expect('a').toBe('a')
        })
    })
})
