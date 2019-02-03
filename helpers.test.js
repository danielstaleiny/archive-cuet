const { log, addQuery, parseAttachmentInfo, sizeParse } = require('./helpers')

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
        test('test', () => {
            expect('a').toBe('a')
        })
    })

    describe('sizeParse', () => {
        test('test', () => {
            expect('a').toBe('a')
        })
    })
})
