const { MODULES, AGENTS, ASSETS, SECTIONS, PlatformState } = require('../src/platform');

describe('Constellation25 Platform', () => {
  describe('MODULES constant', () => {
    test('should have exactly 27 modules', () => {
      expect(MODULES.length).toBe(27);
    });

    test('should include CoreKernel module', () => {
      expect(MODULES).toContain('CoreKernel');
    });

    test('should include EarthRouter as the last module', () => {
      expect(MODULES[MODULES.length - 1]).toBe('EarthRouter');
    });

    test('should not have duplicate module names', () => {
      const uniqueModules = new Set(MODULES);
      expect(uniqueModules.size).toBe(MODULES.length);
    });
  });

  describe('AGENTS constant', () => {
    test('should have exactly 25 agents', () => {
      expect(AGENTS.length).toBe(25);
    });

    test('should follow C25-XX naming pattern', () => {
      AGENTS.forEach(agent => {
        expect(agent).toMatch(/^C25-\d{2}$/);
      });
    });

    test('first agent should be C25-01', () => {
      expect(AGENTS[0]).toBe('C25-01');
    });

    test('last agent should be C25-25', () => {
      expect(AGENTS[AGENTS.length - 1]).toBe('C25-25');
    });
  });

  describe('ASSETS constant', () => {
    test('should have html, gamma, notebook, and banani categories', () => {
      expect(Object.keys(ASSETS)).toEqual(expect.arrayContaining(['html', 'gamma', 'notebook', 'banani']));
    });

    test('each asset path should end with a filename', () => {
      Object.values(ASSETS).flat().forEach(path => {
        expect(path.split('/').pop()).toBeTruthy();
      });
    });
  });

  describe('SECTIONS constant', () => {
    test('should have modules, agents, and assets sections', () => {
      expect(Object.keys(SECTIONS)).toEqual(['modules', 'agents', 'assets']);
    });

    test('each section should have label and data properties', () => {
      Object.values(SECTIONS).forEach(section => {
        expect(section).toHaveProperty('label');
        expect(section).toHaveProperty('data');
      });
    });

    test('modules section data should match MODULES length', () => {
      expect(SECTIONS.modules.data.length).toBe(MODULES.length);
    });

    test('agents section data should match AGENTS length', () => {
      expect(SECTIONS.agents.data.length).toBe(AGENTS.length);
    });
  });
});

describe('PlatformState class', () => {
  let platform;

  beforeEach(() => {
    platform = new PlatformState();
  });

  describe('constructor', () => {
    test('should initialize with modules as active section', () => {
      expect(platform.getActiveSection()).toBe('modules');
    });

    test('should have modules property', () => {
      expect(platform.modules).toEqual(MODULES);
    });

    test('should have agents property', () => {
      expect(platform.agents).toEqual(AGENTS);
    });

    test('should have assets property', () => {
      expect(platform.assets).toEqual(ASSETS);
    });
  });

  describe('getActiveSection', () => {
    test('should return current active section', () => {
      expect(platform.getActiveSection()).toBe('modules');
    });
  });

  describe('setActiveSection', () => {
    test('should set valid section successfully', () => {
      expect(platform.setActiveSection('agents')).toBe('agents');
      expect(platform.getActiveSection()).toBe('agents');
    });

    test('should throw error for invalid section', () => {
      expect(() => platform.setActiveSection('invalid')).toThrow('Invalid section: invalid');
    });

    test('should allow switching between all valid sections', () => {
      ['modules', 'agents', 'assets'].forEach(section => {
        expect(platform.setActiveSection(section)).toBe(section);
      });
    });
  });

  describe('getModuleCount', () => {
    test('should return 27', () => {
      expect(platform.getModuleCount()).toBe(27);
    });
  });

  describe('getAgentCount', () => {
    test('should return 25', () => {
      expect(platform.getAgentCount()).toBe(25);
    });
  });

  describe('getAssetCount', () => {
    test('should return correct asset count', () => {
      const expectedCount = Object.values(ASSETS).flat().length;
      expect(platform.getAssetCount()).toBe(expectedCount);
    });
  });

  describe('getSectionData', () => {
    test('should return modules data for modules section', () => {
      const data = platform.getSectionData('modules');
      expect(data.length).toBe(27);
      expect(data[0]).toHaveProperty('name', 'CoreKernel');
    });

    test('should return agents data for agents section', () => {
      const data = platform.getSectionData('agents');
      expect(data.length).toBe(25);
      expect(data[0]).toHaveProperty('name', 'C25-01');
    });

    test('should return empty array for non-existent section', () => {
      const data = platform.getSectionData('nonexistent');
      expect(data).toEqual([]);
    });
  });

  describe('getModuleName', () => {
    test('should return correct module name for valid index', () => {
      expect(platform.getModuleName(0)).toBe('CoreKernel');
      expect(platform.getModuleName(26)).toBe('EarthRouter');
    });

    test('should throw error for negative index', () => {
      expect(() => platform.getModuleName(-1)).toThrow('Index out of range');
    });

    test('should throw error for index >= length', () => {
      expect(() => platform.getModuleName(27)).toThrow('Index out of range');
    });
  });

  describe('getAgentName', () => {
    test('should return correct agent name for valid index', () => {
      expect(platform.getAgentName(0)).toBe('C25-01');
      expect(platform.getAgentName(24)).toBe('C25-25');
    });

    test('should throw error for negative index', () => {
      expect(() => platform.getAgentName(-1)).toThrow('Index out of range');
    });

    test('should throw error for index >= length', () => {
      expect(() => platform.getAgentName(25)).toThrow('Index out of range');
    });
  });

  describe('filterAssetsByType', () => {
    test('should return html assets when type is html', () => {
      const htmlAssets = platform.filterAssetsByType('html');
      expect(htmlAssets).toEqual(ASSETS.html);
    });

    test('should return empty array for unknown type', () => {
      const unknownAssets = platform.filterAssetsByType('unknown');
      expect(unknownAssets).toEqual([]);
    });
  });

  describe('getStats', () => {
    test('should return object with correct properties', () => {
      const stats = platform.getStats();
      expect(stats).toHaveProperty('moduleCount', 27);
      expect(stats).toHaveProperty('agentCount', 25);
      expect(stats).toHaveProperty('assetCount');
      expect(stats).toHaveProperty('reposSynced', 8);
    });

    test('assetCount should match getAssetCount', () => {
      const stats = platform.getStats();
      expect(stats.assetCount).toBe(platform.getAssetCount());
    });
  });
});
