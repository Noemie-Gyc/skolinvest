// CRUD section elements that concerns one specific ID, we want to update one ID or delete one specific ID

import { NextResponse } from 'next/server';

// We made a promise containing the ID of the section we want to get
export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const cookieHeader = request.headers.get('cookie') || '';
  const { id } = params;

  const res = await fetch(`http://localhost:8000/api/v1/sections/${id}/`, {
    headers: {
      'Content-Type': 'application/json',
      cookie: cookieHeader,
    },
  });

  const raw = await res.text();

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Erreur du backend Django', details: raw },
      { status: res.status }
    );
  }
  return new NextResponse(raw, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// We made a promise containing the ID of the section we want to update, once we click on the title of the sections the ID is received with the fields changed. 

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const requestBody = await request.json();
  const cookieHeader = request.headers.get('cookie') || '';


  const res = await fetch(`http://localhost:8000/api/v1/sections/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      cookie: cookieHeader,
    },
    body: JSON.stringify(requestBody),
  });

  const raw = await res.text();
  // if there is an error, we send the error the backend has written
  if (!res.ok) {
    return NextResponse.json(
      { error: 'Erreur Django', details: raw },
      { status: res.status }
    );
  }
  // if all is good it sends the json with the data to our front that will treat it.
  return new NextResponse(raw, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// This is an asynchronous API route. Getting params is an asynchronous operation, we don't get the data immediatly. It takes some time to get the whole object data
// from the backend. The await enables the function to be executed only if the data has been prepared. It waits the data is ready to be executed.
export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const cookieHeader = request.headers.get('cookie') || '';
  const { id } = params;

  const res = await fetch(`http://localhost:8000/api/v1/sections/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      cookie: cookieHeader,
    },
  });

  if (!res.ok) {
    const raw = await res.text();
    return NextResponse.json(
      { error: 'Erreur Django', details: raw },
      { status: res.status }
    );
  }

  return new NextResponse(null, { status: 204 });
}