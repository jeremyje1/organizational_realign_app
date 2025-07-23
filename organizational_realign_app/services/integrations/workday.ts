export interface WorkdayPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  employeeCount: number;
  isVacant: boolean;
  createdDate: string;
  lastModified: string;
}

export interface WorkdayApiResponse {
  positions: WorkdayPosition[];
  totalCount: number;
  hasMore: boolean;
  nextPage?: string;
}

export async function pullWorkdayPositions(apiKey: string): Promise<WorkdayApiResponse> {
  try {
    const res = await fetch(
      'https://api.workday.com/v1/positions',
      { 
        headers: { 
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        } 
      }
    );

    if (!res.ok) {
      throw new Error(`Workday API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    
    // Transform Workday data to our expected format
    return {
      positions: data.positions?.map((pos: any) => ({
        id: pos.id,
        title: pos.jobProfile?.name || pos.title,
        department: pos.organizationalUnit?.name || '',
        location: pos.location?.name || '',
        employeeCount: pos.workerCount || 0,
        isVacant: pos.workerCount === 0,
        createdDate: pos.effectiveDate,
        lastModified: pos.lastModified
      })) || [],
      totalCount: data.totalCount || 0,
      hasMore: data.hasMore || false,
      nextPage: data.nextPage
    };
  } catch (error) {
    console.error('Error fetching Workday positions:', error);
    throw new Error(`Failed to fetch Workday positions: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function pullWorkdayOrgUnits(apiKey: string): Promise<any> {
  try {
    const res = await fetch(
      'https://api.workday.com/v1/organizational-units',
      { 
        headers: { 
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        } 
      }
    );

    if (!res.ok) {
      throw new Error(`Workday API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching Workday org units:', error);
    throw new Error(`Failed to fetch Workday org units: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function testWorkdayConnection(apiKey: string): Promise<boolean> {
  try {
    const res = await fetch(
      'https://api.workday.com/v1/health',
      { 
        headers: { 
          Authorization: `Bearer ${apiKey}`,
          'Accept': 'application/json'
        } 
      }
    );

    return res.ok;
  } catch (error) {
    console.error('Workday connection test failed:', error);
    return false;
  }
}
