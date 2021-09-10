import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';

const mockPosts = [];

const server = setupServer(
  rest.get('/api/posts', (req, res, ctx) => {
    return res(ctx.json(mockPosts));
  }),
  rest.get('/api/posts/:id', (req, res, ctx) => {
    const post = mockPosts.find(post => post.id === req.params.id);

    return res(ctx.json(post));
  }),
  rest.post('/api/posts', (req, res, ctx) => {
    mockPosts.push(req.params);
    return res(ctx.json({ sucess: true }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Fetch posts on load', async () => {
  render(<App />);

  const waitingText = screen.getByText(/Fetching posts.../i);
  expect(waitingText).toBeInTheDocument();

  await waitFor(() => {
    const linkElement = screen.getByText(`Loaded ${mockPosts.length} posts.`);
    expect(linkElement).toBeInTheDocument();
  });
});
