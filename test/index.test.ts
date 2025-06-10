import nock from "nock"
import { Probot, ProbotOctokit } from "probot"
import myProbotApp from "../src"
import { describe, beforeEach, test, expect } from "@jest/globals"

nock.disableNetConnect()

describe("My Probot app", () => {
  let probot: Probot

  beforeEach(() => {
    probot = new Probot({
      appId: 123,
      privateKey: "test",
      // disable request throttling and retries for testing
      Octokit: ProbotOctokit.defaults({
        retry: { enabled: false },
        throttle: { enabled: false },
      }),
    })

    // Load our app into probot
    probot.load(myProbotApp)
  })

  test("creates a comment when an issue is opened", async () => {
    const mock = nock("https://api.github.com")
      // Test that we correctly return a test token
      .post("/app/installations/2/access_tokens")
      .reply(200, {
        token: "test",
        permissions: {
          issues: "write",
        },
      })

      // Test that a comment is posted
      .post("/repos/hiimbex/testing-things/issues/1/comments", (body) => {
        expect(body).toMatchObject({
          body: "Thanks for opening this issue! A team member will review it shortly.",
        })
        return true
      })
      .reply(200)

    // Receive a webhook event
    await probot.receive({
      name: "issues",
      id: "123",
      payload: {
        action: "opened",
        issue: {
          number: 1,
        },
        repository: {
          name: "testing-things",
          owner: {
            login: "hiimbex",
          },
        },
        installation: {
          id: 2,
        },
      },
    })

    expect(mock.pendingMocks()).toStrictEqual([])
  })
})
