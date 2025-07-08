import { NextApiRequest, NextApiResponse } from 'next'
import { revalidatePath, revalidateTag } from 'next/cache'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verify request is authorized (you may want to add authentication)
  const { authorization } = req.headers
  
  if (authorization !== `Bearer ${process.env.REVALIDATION_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    switch (req.method) {
      case 'POST':
        return await handleRevalidation(req, res)
      case 'DELETE':
        return await handleCachePurge(req, res)
      default:
        res.setHeader('Allow', ['POST', 'DELETE'])
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Revalidation error:', error)
    return res.status(500).json({ 
      error: 'Revalidation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

async function handleRevalidation(req: NextApiRequest, res: NextApiResponse) {
  const { path, tag, tags } = req.query

  if (path) {
    // Revalidate specific path
    const pathString = Array.isArray(path) ? path[0] : path
    await revalidatePath(pathString)
    
    return res.json({ 
      revalidated: true, 
      path: pathString,
      timestamp: new Date().toISOString()
    })
  }

  if (tag) {
    // Revalidate specific tag
    const tagString = Array.isArray(tag) ? tag[0] : tag
    await revalidateTag(tagString)
    
    return res.json({ 
      revalidated: true, 
      tag: tagString,
      timestamp: new Date().toISOString()
    })
  }

  if (tags) {
    // Revalidate multiple tags
    const tagArray = Array.isArray(tags) ? tags : [tags]
    
    for (const tagItem of tagArray) {
      await revalidateTag(tagItem)
    }
    
    return res.json({ 
      revalidated: true, 
      tags: tagArray,
      timestamp: new Date().toISOString()
    })
  }

  return res.status(400).json({ 
    error: 'Missing path or tag parameter' 
  })
}

async function handleCachePurge(req: NextApiRequest, res: NextApiResponse) {
  // Purge common cache tags
  const commonTags = [
    'static-content',
    'assessments',
    'analytics',
    'user-data'
  ]

  for (const tag of commonTags) {
    await revalidateTag(tag)
  }

  // Also revalidate key paths
  const keyPaths = [
    '/',
    '/assessment',
    '/dashboard',
    '/reports',
    '/analytics'
  ]

  for (const path of keyPaths) {
    await revalidatePath(path)
  }

  return res.json({ 
    purged: true,
    tags: commonTags,
    paths: keyPaths,
    timestamp: new Date().toISOString()
  })
}
