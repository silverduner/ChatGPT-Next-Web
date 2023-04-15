import { NextRequest, NextResponse } from "next/server";
import { faunaClient } from "../common";
import { query as q } from "faunadb";

export async function PUT(req: NextRequest) {
  return req
    .json()
    .then((body) => {
      return faunaClient.query(
        q.Create(q.Collection("store"), {
          data: {
            geo: req.geo,
            agent: req.headers.get("user-agent"),
            code: req.headers.get("access-code"),
            body: body,
          },
        }),
      );
    })
    .then((o) => {
      return NextResponse.json({ msg: "done" }, { status: 200 });
    })
    .catch((e) => {
      return NextResponse.json(
        {
          error: true,
          msg: JSON.stringify(e),
        },
        { status: 500 },
      );
    });
}
